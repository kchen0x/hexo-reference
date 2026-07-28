# hexo-reference

A plugin to support markdown footnotes and Wiki-Style tooltip reference in your Hexo blog posts.

## Installation

Node.js 18 or newer is required.

```sh
npm install hexo-reference --save
```

Hexo normally detects installed plugins automatically.

If automatic plugin detection is disabled, add the package to the `plugins`
list in `_config.yml`:

```yaml
plugins:
  - hexo-reference
```

## Syntax

### Markdown

```markdown
basic footnote[^1]
here is an inline footnote[^2](inline footnote)
named references work too[^details]
the same footnote can be referenced again[^1]

[^1]: basic footnote content
[^details]: paragraph
footnote
content
```

Footnote definitions must start on their own line. Footnotes are numbered by
the order of their first reference, regardless of the definition label.

Markdown in a footnote is rendered in the footnote list and converted to plain
text in the tooltip.

### Output

![footnotes](http://rw920d1od.hd-bkt.clouddn.com/hexo/footnote.png)
