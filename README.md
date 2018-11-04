# hexo-reference
[![npm version](https://img.shields.io/npm/v/hexo-reference.svg?)](https://www.npmjs.com/package/hexo-reference) [![travis build status](https://img.shields.io/travis/kchen0x/hexo-reference/master.svg?)](https://travis-ci.org/kchen0x/hexo-reference) [![Coverage Status](https://coveralls.io/repos/github/kchen0x/hexo-reference/badge.svg?branch=master)](https://coveralls.io/github/kchen0x/hexo-reference?branch=master) [![npm dependencies](https://img.shields.io/david/kchen0x/hexo-reference.svg?)](https://david-dm.org/kchen0x/hexo-reference#info=dependencies&view=table) [![npm dev dependencies](https://img.shields.io/david/dev/kchen0x/hexo-reference.svg?)](https://david-dm.org/kchen0x/hexo-reference#info=devDependencies&view=table)

A plugin to support markdown footnotes and Wiki-Style tooltip reference in your Hexo blog posts.

## Installation

```
npm install hexo-reference --save
```

If Hexo detect automatically all plugins, that's all.  

If that is not the case, register the plugin in your `_config.yml` file :
```
plugins:
  - hexo-reference
```

## Syntax

### Mardown
```
basic footnote[^1]
here is an inline footnote[^2](inline footnote)
and another one[^3]
and another one[^4]

[^1]: basic footnote content
[^3]: paragraph
footnote
content
[^4]: footnote content with some [markdown](https://en.wikipedia.org/wiki/Markdown)
```

See [Demo](http://kchen.cc/2016/11/10/footnotes-in-hexo/) here.

### Output
![footnotes](http://data.kchen.cc/mac_qrsync/71e694ce6f0052b83f7af81cfa7ccc64.png-960.jpg)