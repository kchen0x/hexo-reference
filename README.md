# hexo-reference
[![npm version](https://img.shields.io/npm/v/hexo-reference.svg?)](https://www.npmjs.com/package/hexo-reference) [![travis build status](https://img.shields.io/travis/quentin-chen/hexo-reference/master.svg?)](https://travis-ci.org/quentin-chen/hexo-reference) [![Coverage Status](https://coveralls.io/repos/github/quentin-chen/hexo-reference/badge.svg?branch=master)](https://coveralls.io/github/quentin-chen/hexo-reference?branch=master) [![npm dependencies](https://img.shields.io/david/quentin-chen/hexo-reference.svg?)](https://david-dm.org/quentin-chen/hexo-reference#info=dependencies&view=table) [![npm dev dependencies](https://img.shields.io/david/dev/quentin-chen/hexo-reference.svg?)](https://david-dm.org/quentin-chen/hexo-reference#info=devDependencies&view=table)

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

### Output
![footnotes](http://7xin49.com1.z0.glb.clouddn.com/mac_qrsync/59299214d0a7f557c7a55fdc2c7e172f.png-960.jpg)