---
title: JavaScript Gotchas
date: "2017-07-02T22:12:03.284Z"
layout: post
readNext: "/my-second-post/"
path: "/js-gotchas/"
tags:
  - JavaScript
  - Front End
  - Software
---

<iframe src="https://giphy.com/embed/GbPru204dTDfG" width="276" height="210" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

This is mostly a list for myself of some of the more quirky examples I've seen
for odd JavaScript behavior along with explanations of why the engine behaves
the way it does.

### Variable vs. Function Initialization

#### Code Sample:

```
function bar() {
    return foo;
    foo = 10;
    function foo() {}
    var foo = '11';
}
alert(typeof bar());
```

#### Answer:

The alert will show

```
'function'
```

#### Explanation:

This will return `'function'` because in the creation phase, the engine sees that
`foo` is set to both a variable and a function.  Since we are returning `foo`
before it is assigned a value as a variable, it would return `undefined` if it
was only a variable.  It is also set as a function name however, which takes
precedence over variable assignment on initialization, so when we look at the
type of the returned `foo`, we see that it is a function.  If the return
statement was at the end of the function `bar`, it would have been of type
`string`, as foo would have been assigned to the string `'11'` by that time.

---

### `this` Based on Calling Context

#### Code Sample:

```
var x = 3;

var foo = {
    x: 2,
    baz: {
        x: 1,
        bar: function() {
            return this.x;
        }
    }
}

var go = foo.baz.bar;

alert(go());
alert(foo.baz.bar());
```

#### Answer:

The alert statements will output in order

```
3, 1
```

#### Explanation:

The variable `go` is assigned to the function which is contained within the
object `foo.baz` under the key `bar`.  This function is then called from within
the global scope, so the `this` within the function will point to the global
variable context.  This results in the first alert returning `3`, since `x` is
defined in the global context as `3`.  The second alert statement calls the same
function, but in a different way.  The expression `foo.baz.bar()` is evaluated
from left to right, so `foo.baz` becomes the object at key `baz` within foo.
This object has a method `bar`, which is then called.  In this calling context,
`this` is set to the object from which the method is called, in this case the
object under the key `baz`.  `x` is set to `1` on the `baz` object, so alert
returns `1`.

---

### Array Addition

#### Code Sample:

```
[] + [] + 'foo'.split('');
```

#### Answer:

```
'f,o,o'
```

#### Explanation:

Arrays are converted to strings when combined using the `+` operator.  Empty
arrays are coerced into empty strings `''`, and arrays of strings or numbers are
coerced into the form `'f,o,o'`.  The result of this expression will therefore
be the string `'f,o,o'`.

<iframe src="https://giphy.com/embed/vpxsRkXfO7KDe" width="480" height="260" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

---

### Array length Property

#### Code Sample:

```
var myArr = ['foo', 'bar', 'baz'];
myArr.length = 0;
myArr.push('bin');
console.log(myArr);
```

#### Answer:

```
['bin']
```

#### Explanation:

The `Array.length` property not only reads the number of elements in an array,
but if assigned a value, also sets the number of elements.  As a result, when
`myArr.length` is set to 0, it empties the array.  The string `'bin'` is then
pushed onto this empty array, so we end up with an array with one element `['bin']`.

---

### Function Constructor with return value

#### Code Sample:

```
var x = 0;
function foo() {
    x++;
    this.x = x;
    return foo;
}
var bar = new new foo;
console.log(bar.x);
```

#### Answer:

```
undefined
```

The variable `bar` uses the `new` keyword to call the function `foo`, ostensibly
using foo as a function constructor.  The function `foo` returns itself,
however, so rather than `new foo` returning a foo object with a key `x` set, it
returns a reference to function `foo`. Calling `new` again simply repeats the process and returns another reference to the function `foo`.  This function object does not have a value `x`
set directly on it, so `bar.x` returns `undefined`.
