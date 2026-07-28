'use strict';

var assert = require('node:assert/strict');
var describe = require('node:test').describe;
var it = require('node:test').it;
var footnotes = require('../src/footnotes');

describe('footnotes', function() {
  it('renders line-based definitions in first-reference order', function() {
    var content = footnotes(
        'First[^named], then second[^2].\n\n' +
        '[^2]: second note\n' +
        '[^named]: first note'
    );

    assert.match(content, /id="fnref:1"[\s\S]+aria-label="first note"[\s\S]+>\[1\]</);
    assert.match(content, /id="fnref:2"[\s\S]+aria-label="second note"[\s\S]+>\[2\]</);
    assert.ok(content.indexOf('id="fn:1"') < content.indexOf('id="fn:2"'));
    assert.doesNotMatch(content, /\[\^(?:named|2)\]:/);
  });

  it('does not mistake a reference followed by a colon for a definition', function() {
    var content = footnotes(
        'info[^1]: anyword\n\n' +
        '[^1]: my footnote'
    );

    assert.match(content, /^info<sup id="fnref:1"/);
    assert.match(content, /<\/sup>: anyword/);
    assert.match(content, /id="fn:1"[\s\S]+my footnote/);
  });

  it('renders inline footnotes with balanced parentheses', function() {
    var content = footnotes('Hello[^note](see [link](https://example.com/a_(b))).');

    assert.match(content, /aria-label="see link"/);
    assert.match(content, /see <a href="https:\/\/example\.com\/a_\(b\)">link<\/a>/);
  });

  it('preserves undefined references', function() {
    assert.equal(footnotes('Unknown[^missing].'), 'Unknown[^missing].');
  });

  it('renders repeated references and a backlink for each one', function() {
    var content = footnotes(
        'One[^a], again[^a].\n\n' +
        '[^a]: note'
    );

    assert.match(content, /id="fnref:1"/);
    assert.match(content, /id="fnref:1:2"/);
    assert.match(content, /href="#fnref:1"/);
    assert.match(content, /href="#fnref:1:2"/);
  });

  it('escapes tooltip attributes and renders Markdown as plain text there', function() {
    var content = footnotes(
        'Claim[^quote].\n\n' +
        '[^quote]: "quoted" & [linked](https://example.com) <b>text</b>'
    );

    assert.match(
        content,
        /aria-label="&quot;quoted&quot; &amp; linked text"/
    );
    assert.match(
        content,
        /title="&quot;quoted&quot; &amp; linked text"/
    );
    assert.match(
        content,
        /&quot;quoted&quot; &amp; linked text/
    );
    assert.match(
        content,
        /&quot;quoted&quot; &amp; <a href="https:\/\/example\.com">linked<\/a> <b>text<\/b>/
    );
  });

  it('supports multiline definitions documented by the project', function() {
    var content = footnotes(
        'Text[^multi].\n\n' +
        '[^multi]: paragraph\n' +
        'footnote\n' +
        'content'
    );

    assert.match(content, /aria-label="paragraph footnote content"/);
    assert.match(content, /paragraph\nfootnote\ncontent/);
  });
});
