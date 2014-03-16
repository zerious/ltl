# ltl

The ltl template language (pronounced "little") uses a clean
[Jade](http://jade-lang.com/reference/)-like syntax to generate
HTML at [doT](https://github.com/olado/doT)-like speeds.

If you love tight code and fast rendering, you're right at home.

## Getting Started

Install
```bash
$ npm install ltl
```

Use
```javascript
var ltl = require('ltl');
var template = ltl.compile('#hi Hello #{name}!');
var result = template({name: 'World'});
// result: '<div id="hi">Hello World!</div>'
```

## API
### ltl.compile(code, [options])
 * `code` is a string of ltl code.
 * `options` is an object with any of the following properties:
  * `name` will cause the template to cache at `ltl.templates[name]`

### ltl.setTabWidth(numberOfSpaces)
 * `numberOfSpaces` is the default number of spaces to convert a tab
   to for mixed tab/space leniency. (Default: 4)

### ltl.setOutputVar(name)
 * `name` is the name of the variable that ltl concatenates to inside
   template functions. (Default: `o`)

### ltl.setContextVar(name)
 * `name` is the name of the argument that passes the data context
   into a template. (Default: `c`)

### ltl.setPartsVar(name)
 * `name` is the name of the argument that an ltl template receives
   from a template that uses it as an abstract template.
   (Default: `p`)

## Language

### Nesting
Tag nesting is done with whitespace. You can use tabs or spaces,
and ltl can detect the number of spaces you're using.
```jade
html
  head
    title Hello World!
  body
    div Here is some content.
```
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World!</title>
  </head>
  <body>
    <div>Here is some content.</div>
  </body>
</html>
```
Note: `<!DOCTYPE html>` is automagically inserted before an `<html>` tag.

Nesting can also be done with one-liners using `>`.
```jade
div>span Boo!
```
```html
<div><span>Boo!</span></div>
```

### IDs and Classes

HTML id and class attributes are done with `#` and `.`
```jade
div#myId.myClass.myOtherClass Hello
```
```html
<div id="myId" class="myClass myOtherClass">Hello</div>
```

When there is no tag name, div is assumed
```jade
.hi Hello
```
```html
<div class="hi">Hello</div>
```

### Attributes

Attributes are contained in parentheses, and treated like
they would be inside an HTML tag.
```jade
(style="display:none" data-something="peek-a-boo") Hide me
```
```html
<div style="display:none;" data-something="peek-a-boo">Hide me</div>
```
Note: Unlike Jade, ltl does not use commas between attributes.

### Blocks

You can output blocks of content using `:`.
```jade
#blah:
  Bob Loblaw's Law Blog asks, "Why should YOU go
  to jail for a crime someone else noticed?
```
```html
<div id="blah">
  Bob Loblaw's Law Blog asks "Why should YOU go
  to jail for a crime someone else noticed?
</div>
```

Blocks can be passed through filters, such as markdown.
```jade
:markdown
    # ltl
    It's a recursive acronym for "ltl template language".
```
```html
<h1>ltl</h1><p>It's a recursive acronym for "ltl template language".</p>
```

### Interpolation

You can output the value of a context property with `#{..}`.
```javascript
var code = '. Hello #{name}!';
var template = ltl.compile(code)
template({name: 'Sam'});
```
```
<div>Hello Sam!</div>
```

If you'd like your content to skip HTML encoding (because
you want your expression to output HTML tags rather than
text, use `={..}`.

Context: `{unsafe: "<script>alert('Gotcha!')</script>"}`
```jade
. ={unsafe}
```
```html
<div><script>alert('Gotcha!')</script></div>
```

### Control
Use `for..in` to iterate over an array inside the context.
 * Context: `{list: ['IPA', 'Porter', 'Stout']}`
```jade
ul
  for item in list
    li #{item}
```
```html
<ul><li>IPA</li><li>Porter</li><li>Stout</li></ul>
```

Use `for..of` to iterate over an object's keys.
```jade
ul
  for field, value of data
    li #{field}: #{value}
```
```html
<ul><li>IPA</li><li>Porter</li><li>Stout</li></ul>
```

### Conditionals

Use `if`, `else` or `else if` to render conditionally.
The control statement's inline content gets evaluated
as JavaScript.
```jade
if username == 'root'
  . Do as you please.
else if username
  . Do as you can.
else
  . Don't.
```

You can use builtin objects and whatnot.
```jade
if Math.random() > 0.5
    p This has a 50/50 chance of showing.
```


### Using templates within templates

A template can use another template with `use`. To accomplish
this, you must compile your templates with `options.name`, and
they will be stored in ltl.cache. The
template that's being `use`d can access the data context.
```jade
var temp = ltl.compile('p\n use bold', {name: 'temp'});
var bold = ltl.compile('b #{text}', {name: 'bold'});
ltl.cache.temp({text: 'Hi!'});
```
```
<p><b>Hi!</b></p>
```

With `get`, a template can get content from a template that
has used it with `use`.  Content that is passed into `get` blocks
is declared with `set`.
```jade
var layout = ltl.compile('#nav\n get nav\n#content\n get content', {name: 'layout'});
var page = ltl.compile('use layout\n set nav\n  . Nav\n set content\n  . Content', {name: 'page'});
ltl.cache.page();
```
```
<div id="nav">Nav</div><div id="content">Content</div>
```


## Contributing

Clone the repository
```bash
$ git clone https://github.com/zerious/ltl.git
```

Install dependencies
```bash
$ npm install
```

### Testing

Run all tests
```bash
$ mocha
```

Watch for changes
```bash
$ mocha -w
```

Run individual tests
```bash
$ mocha test/api
$ mocha test/blocks
$ mocha test/control
$ mocha test/interpolation
...
```

Test coverage (100% required)
```bash
$ npm test --coverage
```

View coverage report
```bash
$ npm run view-coverage
```

### Write something awesome and submit a pull request!
