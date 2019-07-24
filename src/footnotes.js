'use strict';

var md = require('markdown-it')({
    // allow HTML tags
    html: true
});

/**
 * Render markdown footnotes
 * @param {String} text
 * @returns {String} text
 */
function renderFootnotes(text) {
    var footnotes = [];
    var reFootnoteContent = /\[\^(\w+)\]: ?([\S\s]+?)(?=\[\^(?:\d+)\]|\n\n|$)/g;
    var reInlineFootnote = /\[\^(\w+)\]\((.+?)\)/g;
    var reAliasFootnote = /\[\^(\w+)\]/g;
    var reFootnoteIndex = /\[\^(\d+)\]/g;

    var html = '';
    var global_index = 0;

    // create map for looking footnotes array
    function createLookMap(field) {
        var map = {}
        for (var i = 0; i < footnotes.length; i++) {
            var item = footnotes[i]
            if (field in item) {
                var key = item[field]
                map[key] = item
            }
        }
        return map
    }

    // firstly collect and clear all footnote contents
    text = text.replace(reFootnoteContent, function (match, alias, content) {
        footnotes.push({
            alias: alias,
            content: content
        });
        // remove footnote content
        return '';
    });

    // loop all inline footnotes, convert to alias style
    text = text.replace(reInlineFootnote, function (match, alias, content) {
        footnotes.push({
            alias: alias,
            content: content
        });
        // remove content of inline footnote, return as footnote index
        return '[^' + alias + ']';
    });

    var aliasMap = createLookMap("alias")

    // loop all alias footnotes, update and leave index
    text = text.replace(reAliasFootnote, function (match, alias) {
        if (aliasMap.hasOwnProperty(alias)) {
            aliasMap[alias].index = ++global_index;
        }
        // return as footnote index
        return '[^' + global_index + ']';
    });

    var indexMap = createLookMap("index")

    // render (HTML) footnotes reference
    text = text.replace(reFootnoteIndex,
        function(match, index){
            if (!indexMap.hasOwnProperty(index) || !indexMap[index].hasOwnProperty("content")) {
                return ''
            }

            var tooltip = indexMap[index].content;
            return '<sup id="fnref:' + index + '">' +
                '<a href="#fn:'+ index +'" rel="footnote">' +
                '<span class="hint--top hint--error hint--medium hint--rounded hint--bounce" aria-label="'
                + tooltip +
                '">[' + index +']</span></a></sup>';
    });

    // delete the footnotes that only has footnote-detail but no mark in text (no index).
    var i = footnotes.length;
    while(i--) {
        if (!footnotes[i].hasOwnProperty("index")) {
            footnotes.splice(i, 1)
        }
    }

    // sort footnotes by their index
    footnotes.sort(function (a, b) {
        return a.index - b.index;
    });

    // render footnotes (HTML)
    footnotes.forEach(function (footNote) {
        html += '<li id="fn:' + footNote.index + '">';
        html += '<span style="display: inline-block; vertical-align: top; padding-right: 10px; margin-left: -40px">';
        html += footNote.index;
        html += '.</span>';
        html += '<span style="display: inline-block; vertical-align: top; margin-left: 10px;">';
        html += md.renderInline(footNote.content.trim());
        html += '<a href="#fnref:' + footNote.index + '" rev="footnote"> ↩</a></span></li>';
    });

    // add footnotes at the end of the content
    if (footnotes.length) {
        text += '<div id="footnotes">';
        text += '<hr>';
        text += '<div id="footnotelist">';
        text += '<ol style="list-style: none; padding-left: 0; margin-left: 40px">' + html + '</ol>';
        text += '</div></div>';
    }
    return text;
}
module.exports = renderFootnotes;
