# little-differ
Module for comparing two JSON documents and creating a JSON representation of the differences between them.

## Installation

`npm install --save '@keywcorp.com/little-differ'`

## Usage

Add to your `package.json` dependencies:

````json
...
  "dependencies": {
    "key": "value",
    "@keywcorp.com/little-differ": "^1.0.0",
    "key": "value"
  },
...
````

Then run `npm install`.

In your js file:

````javascript
import { compareJSON } from '@keywcorp.com/little-differ'

const docA = { a:1 }
const docB = { a:2 }
const diffDoc = compareJSON(docA, docB)
console.log(diffDoc)
````

The output will be:

````javascript
{
    a: [{a: 1}, {a: 2}]
}
````

## Understanding the Output format

Any two JSON docs can have two types of differences: different keys, and different values for common keys.

`little-differ` lists all keys, and within each key lists the values.

These two documents have the same key, `a`, but the value in each is different. `little-differ` returns that key's name, `a`, followed by an array of key/value pairs for each document. It might seem a little verbose.

![Docs have same key, different value](https://github.com/mobdata/little-differ/wiki/little-differ-examples-01.png)

These next two documents have a key named `b` instead of `a`. The output is very similar to the above.

![Docs have same key, different value](https://github.com/mobdata/little-differ/wiki/little-differ-examples-02.png)

These documents have different keys, `a` and `b`. The output will show `null` for the document that's missing the key.

![Docs have different keys](https://github.com/mobdata/little-differ/wiki/little-differ-examples-03.png)

It's a little more obvious once there are some common keys and unique keys. The output shows you how key `a` is in both documents and both documents have the same value, `1`. When you see `a: [{ a: 1 }, { a: 1} ]`, think of it as the document on the left and on the right. Then for key `b`, the output `b: [{ b: 2 }, null]` shows you the left document has value `2`, and the document on the right has no key `b` at all.

![Docs have some keys in common](https://github.com/mobdata/little-differ/wiki/little-differ-examples-04.png)

## Defining `undefined`

`little-differ` can distinguish between a missing key and a key's value set to `undefined`.

But wait, `undefined` isn't valid JSON...this is true, but it's very easy to programmatically assigned `undefined` to a value when creating JSON. Here's how the output differs with a missing key versus an `undefined` value.

![Missing versus undefined](https://github.com/mobdata/little-differ/wiki/little-differ-examples-05.png)
