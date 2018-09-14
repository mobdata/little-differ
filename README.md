# little-differ
Module for comparing two JSON documents and creating a JSON representation of the differences between them.

## Installation

`npm install --save '@keywcorp.com/little-differ'`

## Usage

Add to your `package.json` dependencies:

````json
...
  "dependencies": {
    ...
    "@keywcorp.com/little-differ": "^1.0.0",
    ...
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

## Output format

### Both docs have same key

| differ 'a' | docA | docB |
|------------|------|------|
|       |  `{ a:1 }` | `{ a:2}` |
| `{a:` |  `[{ a:1 },` | `{ a:2}]}` |

### Docs don't share a common key

| differ 'a' | docA | docB |
|------------|------|------|
|       |  `{ a:1 }`   | `{ b:2}` |
| `{a:` |  `[{ a:1 },` | `null],` |
| `b:`  |  `[null,`    | `{ b:2 }]}` |
