'use strict';

var md = require('markdown-it')({
  // Allow trusted HTML in the rendered footnote body. Tooltip text is escaped
  // separately before it is placed in an HTML attribute.
  html: true
});

/**
 * Escape text for use in an HTML attribute.
 * @param {String} text
 * @returns {String}
 */
function escapeAttribute(text) {
  return text
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}

/**
 * Convert inline Markdown to the readable plain text used by the tooltip.
 * @param {String} source
 * @returns {String}
 */
function markdownToText(source) {
  var tokens = md.parseInline(source, {});
  var text = '';

  function appendTokens(items) {
    items.forEach(function(token) {
      if (token.children) {
        appendTokens(token.children);
      } else if (token.type === 'text' || token.type === 'code_inline') {
        text += token.content;
      } else if (token.type === 'image') {
        text += token.content;
      } else if (token.type === 'softbreak' || token.type === 'hardbreak') {
        text += ' ';
      }
    });
  }

  appendTokens(tokens);
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Collect line-based footnote definitions and remove them from the document.
 * Definitions intentionally have to start a line. This prevents text such as
 * "info[^1]: value" from being mistaken for a definition.
 * @param {String} text
 * @returns {{text: String, definitions: Object}}
 */
function extractDefinitions(text) {
  var lines = text.split('\n');
  var definitions = Object.create(null);
  var output = [];
  var definitionPattern = /^ {0,3}\[\^([^\]\s]+)\]:[ \t]*(.*)$/;

  for (var i = 0; i < lines.length; i++) {
    var match = definitionPattern.exec(lines[i]);
    if (!match) {
      output.push(lines[i]);
      continue;
    }

    var content = [match[2]];
    while (i + 1 < lines.length &&
        lines[i + 1].trim() !== '' &&
        !definitionPattern.test(lines[i + 1])) {
      content.push(lines[++i].replace(/^ {1,4}/, ''));
    }

    definitions[match[1]] = content.join('\n').trim();
  }

  return {
    text: output.join('\n'),
    definitions: definitions
  };
}

/**
 * Collect inline footnotes while respecting balanced parentheses.
 * @param {String} text
 * @param {Object} definitions
 * @returns {String}
 */
function extractInlineFootnotes(text, definitions) {
  var output = '';

  for (var i = 0; i < text.length; i++) {
    if (text[i] !== '[' || text[i + 1] !== '^') {
      output += text[i];
      continue;
    }

    var aliasEnd = text.indexOf(']', i + 2);
    if (aliasEnd === -1 || text[aliasEnd + 1] !== '(') {
      output += text[i];
      continue;
    }

    var alias = text.slice(i + 2, aliasEnd);
    if (!alias || /\s/.test(alias)) {
      output += text[i];
      continue;
    }

    var depth = 1;
    var escaped = false;
    var contentEnd = aliasEnd + 2;
    for (; contentEnd < text.length; contentEnd++) {
      var character = text[contentEnd];
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === '(') {
        depth++;
      } else if (character === ')' && --depth === 0) {
        break;
      }
    }

    if (depth !== 0) {
      output += text[i];
      continue;
    }

    definitions[alias] = text.slice(aliasEnd + 2, contentEnd);
    output += '[^' + alias + ']';
    i = contentEnd;
  }

  return output;
}

/**
 * Render markdown footnotes.
 * @param {String} text
 * @returns {String} text
 */
function renderFootnotes(text) {
  if (typeof text !== 'string' || !text) {
    return text;
  }

  var extracted = extractDefinitions(text);
  var definitions = extracted.definitions;
  var footnotes = [];
  var byAlias = Object.create(null);

  text = extractInlineFootnotes(extracted.text, definitions);
  text = text.replace(/\[\^([^\]\s]+)\]/g, function(match, alias) {
    if (!Object.prototype.hasOwnProperty.call(definitions, alias)) {
      return match;
    }

    var footnote = byAlias[alias];
    if (!footnote) {
      footnote = {
        alias: alias,
        content: definitions[alias],
        index: footnotes.length + 1,
        references: 0
      };
      byAlias[alias] = footnote;
      footnotes.push(footnote);
    }

    footnote.references++;
    var referenceId = 'fnref:' + footnote.index;
    if (footnote.references > 1) {
      referenceId += ':' + footnote.references;
    }
    var tooltip = escapeAttribute(markdownToText(footnote.content));

    return '<sup id="' + referenceId + '">' +
        '<a href="#fn:' + footnote.index + '" rel="footnote">' +
        '<span class="hexo-reference hint--top hint--error hint--medium hint--rounded hint--bounce"' +
        ' aria-label="' + tooltip + '" title="' + tooltip + '">' +
        '[' + footnote.index + ']</span></a></sup>';
  });

  if (!footnotes.length) {
    return text;
  }

  var html = '';
  footnotes.forEach(function(footnote) {
    html += '<li id="fn:' + footnote.index + '">';
    html += '<span class="hexo-reference-index">' + footnote.index + '.</span>';
    html += '<span class="hexo-reference-text">';
    html += md.renderInline(footnote.content);

    for (var i = 1; i <= footnote.references; i++) {
      var referenceId = 'fnref:' + footnote.index + (i > 1 ? ':' + i : '');
      html += '<a href="#' + referenceId + '" rev="footnote"> ↩</a>';
    }
    html += '</span></li>';
  });

  return text +
      '<div id="footnotes"><hr><div id="footnotelist">' +
      '<ol class="hexo-reference-list">' + html + '</ol>' +
      '</div></div>';
}

module.exports = renderFootnotes;
