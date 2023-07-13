# hexo-reference

A plugin to support markdown footnotes and Wiki-Style tooltip reference in your Hexo blog posts.

## Installation

```
npm install hexo-reference-new --save
```

If Hexo detect automatically all plugins, that's all.  

If that is not the case, register the plugin in your `_config.yml` file :
```
plugins:
  - hexo-reference-new
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
![footnotes](http://rw920d1od.hd-bkt.clouddn.com/hexo/footnote.png)
