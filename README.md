# hexo-reference-new

A plugin to support markdown footnotes and Wiki-Style tooltip reference in your Hexo blog posts.

Base on [hexo-reference](https://github.com/kchen0x/hexo-reference)

致敬原作者 [kchen0x](https://github.com/kchen0x)

使用该插件的时候发现我的hexo页面经常打开很慢，经排查是因为 `hexo-reference` 中引用的 `hint.css` 的 CDN 速度过慢，应该是版本过老的原因，折腾了一番，发现作者已停更，暂未想出一个更好的方法，因此修改了新的CDN发布到npmjs上。


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