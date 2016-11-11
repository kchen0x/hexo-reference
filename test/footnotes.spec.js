/* eslint-disable no-unused-vars */
var should = require('chai').should();
/* eslint-enable no-unused-vars */
var footnotes = require('./../src/footnotes');

describe('footnotes', function() {
  it('render (basic)', function() {
    var content = footnotes('hey buddy[^5], it\'s a test [^5]: basic footnote content');
    content.should.equal(
      'hey buddy<sup id="fnref:5"><a href="#fn:5" rel="footnote"><span class="hint--top-right hint--error hint--large" aria-label="basic footnote content">[5]</span></a></sup>, it\'s a test ' +
      '<div id="footnotes">' +
      '<hr>' +
      '<div id="footnotelist">' +
      '<ol style="list-style: none; padding-left: 0; margin-left: 40px">' +
      '<li id="fn:5">' +
      '<span style="display: inline-block; vertical-align: top; padding-right: 10px; margin-left: -40px">' +
      '5.' +
      '</span>' +
      '<span style="display: inline-block; vertical-align: top; margin-left: 10px;">' +
      'basic footnote content' +
      '<a href="#fnref:5" rev="footnote"> ↩</a></span></li></ol></div></div>'
    );
  });

  it('render (random number)', function() {
    var content = footnotes('hey buddy[^13], it\'s a test [^13]: basic footnote content');
    content.should.equal(
      'hey buddy<sup id="fnref:13"><a href="#fn:13" rel="footnote"><span class="hint--top-right hint--error hint--large" aria-label="basic footnote content">[13]</span></a></sup>, it\'s a test ' +
      '<div id="footnotes">' +
      '<hr>' +
      '<div id="footnotelist">' +
      '<ol style="list-style: none; padding-left: 0; margin-left: 40px">' +
      '<li id="fn:13">' +
      '<span style="display: inline-block; vertical-align: top; padding-right: 10px; margin-left: -40px">' +
      '13.' +
      '</span>' +
      '<span style="display: inline-block; vertical-align: top; margin-left: 10px;">' +
      'basic footnote content' +
      '<a href="#fnref:13" rev="footnote"> ↩</a></span></li></ol></div></div>'
    );
  });

  it('render (inline footnote)', function() {
    var content = footnotes('hey buddy[^2](friend), it\'s a test');
    content.should.equal(
      'hey buddy<sup id="fnref:2"><a href="#fn:2" rel="footnote"><span class="hint--top-right hint--error hint--large" aria-label="friend">[2]</span></a></sup>, it\'s a test' +
      '<div id="footnotes">' +
      '<hr>' +
      '<div id="footnotelist">' +
      '<ol style="list-style: none; padding-left: 0; margin-left: 40px">' +
      '<li id="fn:2">' +
      '<span style="display: inline-block; vertical-align: top; padding-right: 10px; margin-left: -40px">' +
      '2.' +
      '</span>' +
      '<span style="display: inline-block; vertical-align: top; margin-left: 10px;">' +
      'friend' +
      '<a href="#fnref:2" rev="footnote"> ↩</a></span></li></ol></div></div>'
    );
  });

  it('render (with markdown content)', function() {
    var content = footnotes('hey buddy[^13], it\'s a test [^13]: basic footnote [content](http://example.com)');
    content.should.equal(
      'hey buddy<sup id="fnref:13"><a href="#fn:13" rel="footnote"><span class="hint--top-right hint--error hint--large" aria-label="basic footnote [content](http://example.com)">[13]</span></a></sup>, it\'s a test ' +
      '<div id="footnotes">' +
      '<hr>' +
      '<div id="footnotelist">' +
      '<ol style="list-style: none; padding-left: 0; margin-left: 40px">' +
      '<li id="fn:13">' +
      '<span style="display: inline-block; vertical-align: top; padding-right: 10px; margin-left: -40px">' +
      '13.' +
      '</span>' +
      '<span style="display: inline-block; vertical-align: top; margin-left: 10px;">' +
      'basic footnote <a href="http://example.com">content</a>' +
      '<a href="#fnref:13" rev="footnote"> ↩</a></span></li></ol></div></div>'
    );
  });
});
