# little-differ
Little Differ contains two Modules for comparing JSON documents.  The module called littleDiffer compares two JSON documents, and the one called tripleDiffer compares three.  Both modules create a JSON representation of the differences between the documents. 

## Installation

`npm install --save '@mobdata/little-differ'`

To build the project, run `npm run build`. To run the tests available for littleDiffer and tripleDiffer, run `npm run test`. This will compare expected module output with set document inputs for testing.

## Usage

Add to your `package.json` dependencies:

````json
...
  "dependencies": {
    "@mobdata/little-differ": "^1.0.0",
  },
...
````

Then run `npm install`.

To use littleDiffer, call compareJSON in your js file with two documents:

````javascript
import { compareJSON } from '@mobdata/little-differ'

const docA = { a:1 }
const docB = { a:2 }
const diffDoc = compareJSON(docA, docB)
console.log(diffDoc)
````

The output will be:

````javascript
{
    a: [{ match: false }, { a: 1 }, { a: 2 }]
}
````

To use tripleDiffer, call compareTripleJSON in your js file with three documents, including an original document, document A, and document B.  

````javascript
import { compareTripleJSON } from '@mobdata/little-differ'

const orig = { a:1 }
const docA = { a:1 }
const docB = { a:2 }
const diffDoc = compareTripleJSON(orig, docA, docB)
console.log(diffDoc)
````

The output will be:

````javascript
{
    a: [{ match: origMatchA }, { a: 1 }, { a: 1 }, { a: 2 }]
}
````

# Understanding the Output format in the Little Differ module

Any two JSON docs can have two types of differences: different keys, and different values for common keys.

`little-differ` lists all keys, and within each key lists a match tag followed by the values.  The match tag has a boolean value indicating if the values for that key are equal.

These two documents have the same key, `a`, but the value in each is different. `little-differ` returns that key's name, `a`, followed by an array with the match tag and the key/value pairs for each document. 


<img width="533" alt="littleDifferMismatch" src="https://user-images.githubusercontent.com/49216173/71515254-a0742280-28a2-11ea-83c2-2b5057bd3c0e.png">

These next two documents have a key named `b` instead of `a`. The output is very similar to the above.

<img width="518" alt="LDMismatchB" src="https://user-images.githubusercontent.com/49216173/71515292-d1545780-28a2-11ea-94c6-b4d3436b35be.png">

These next documents have different keys, `a` and `b`. The output will show `null` for the document that's missing the key.

<img width="760" alt="LDnullexample" src="https://user-images.githubusercontent.com/49216173/71575206-6a29e380-2aec-11ea-9445-04b654bd0c28.png">

The next output shows you how key `a` is in both documents and both documents have the same value, `1`. Then for key `b`, the output `b: [{ b: 2 }, null]` shows you Document A has value `2`, and Document B has no key `b` at all.

<img width="759" alt="LDnullexample2" src="https://user-images.githubusercontent.com/49216173/71576594-63ea3600-2af1-11ea-9d77-2b701a6f10d5.png">

## Using `null`

In the above examples, null is used to identify when a key is missing from a document, but exists in the other document.  It can also be used if null is the assigned value of a key.  Here's how the output differs with a missing key versus an assigned `null` value.

<img width="831" alt="MissingVersusAssignedNull" src="https://user-images.githubusercontent.com/49216173/71578820-00b0d180-2afa-11ea-927a-1734e5054928.png">


## Defining `undefined`

`little-differ` can also distinguish between a missing key and a key's value set to `undefined`.

But wait, `undefined` isn't valid JSON...this is true, but it's very easy to programmatically assigned `undefined` to a value when creating JSON. Here's how the output differs with a missing key versus an `undefined` value.

<img width="831" alt="MissingVersusUndefined" src="https://user-images.githubusercontent.com/49216173/71579235-f8f22c80-2afb-11ea-9092-c6dcfb0f8c56.png">


# Understanding the Output format in the Triple Differ module

The output of Triple Differ is very similar to Little Differ, but contains the output of three documents.  Also, the match tag that is provided for each key is not a boolean value.  It provides more detail as to which document's values match.  There are 5 possible values of the match tag: `allEqual`, `allDiff`, `origMatchA`, `origMatchB`, and `modsMatch`.  Triple Differ also assumes the positioning of the three documents when the compareTripleJSON function is called.  The original document will be in the first position, document A in the second, and document B in the third.  In the results, the output for each key will be in the same order with the addition of the match tag.  

Lets see some examples: 
Here is a simple mismatch of values.  
<img width="590" alt="TripleMismatch" src="https://user-images.githubusercontent.com/49216173/71580816-9bada980-2b02-11ea-8120-9099e9c42223.png">

## Using `null`

Again, `null` is used to identify when a key is missing from one of the documents, and also is used if `null` is the assigned value of a key.  The following example demonstrates both cases of how `null` is used.  Seen here, the first document has the assigned value of `null` for key `a`, the second has an assigned value for key `a`, and the third is missing key `a` all together.

<img width="726" alt="LDTripleNullExample" src="https://user-images.githubusercontent.com/49216173/71670942-dff2b100-2d71-11ea-90a1-5a3739cba92c.png">

## Nested values 

Both modules identify when an object is nested inside another object.  If all three documents contain the nested key, the code will recursively step into the object, and once a key is found, it will identify if the three documents match for that key and assign a match value. See the following examples of nested objects.  

Simple Nested Object example with equal value among all three documents: 
<img width="596" alt="LDTripleEqualNestedObj" src="https://user-images.githubusercontent.com/49216173/71674976-0833dd00-2d7d-11ea-8725-b6a8663680e6.png">

Nested Object where one of the documents does not contain the nested key.  This is where the output gets more complicated, but the colors help identify where the data is coming from:

<img width="721" alt="LDTripleSingleNestedObj" src="https://user-images.githubusercontent.com/49216173/71677449-27356d80-2d83-11ea-83ad-7032c219e13f.png">

## Understanding Match tags 

`allEqual` - all three documents contain equal values for the given key 

`allDiff` - all three documents contain a different value for the given key 
The next three match tags assume the three documents are in a particular order.  The first document is assumed to be the original of the following two modified documents, the second is assumed to be document A, and the third is assumed to be document B.

`origMatchA` - the first and second documents contain equal values, but differ from the third document for the given key

`origMatchB` - the first and third documents contain equal values, but differ from the second document for the given key

`modsMatch` - the second and third documents (both modified docs) contain equal values, but differ from the first document for the given key
