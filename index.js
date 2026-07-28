var renderFootnotes = require('./src/footnotes');

var stylesheet =
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/hint.css/2.7.0/hint.min.css">' +
    '<style>' +
    '.hexo-reference-list{list-style:none;padding-left:0;margin-left:40px}' +
    '.hexo-reference-list>li{list-style:none!important}' +
    '.hexo-reference-index{display:inline-block;vertical-align:top;padding-right:10px;margin-left:-40px}' +
    '.hexo-reference-text{display:inline-block;vertical-align:top;margin-left:10px}' +
    '@media(max-width:480px){.hexo-reference.hint--top:after,.hexo-reference.hint--top:before{display:none!important}}' +
    '</style>';

// Register footnotes filter
hexo.extend.filter.register('before_post_render', function(data) {
  data.content = renderFootnotes(data.content);
  return data;
});

// Add styles to HTML pages, rather than to post content that may be emitted as
// JSON, JavaScript, CSS, or another non-HTML format.
hexo.extend.injector.register('head_end', stylesheet);
