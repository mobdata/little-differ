/**
* @name littleDiffer.js
* @author Juliet Adams and Sara Kim
* @description testing for compareJSON function
*/

const test = require('ava');
const littleDiffer = require('./lib/littleDiffer.js');

if (process.argv[2] === 'verbose') {
console.debugging = true;
}
else {
console.debugging = false;
}
console.debug("Beginning tests in test.js");
//Testing missing value a in Obj2; returns null
test('Simple Test 1', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { }
  const testObj3 = { a: [{ match: false }, { a: 1 }, null] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value a in Obj1; returns null
test('Simple Test 2', (t) => {
  const testObj1 = { }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: false }, null, { a: 1 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing undefined value a in Obj2; returns { a: undefined }
test('Simple Test 3', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: undefined }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: undefined }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing undefined value a in Obj1; returns { a:undefined }
test('Simple Test 4', (t) => {
  const testObj1 = { a: undefined }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: false }, { a: undefined }, { a: 1 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match of value a
test('Simple Test 5', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: 2 }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: 2 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value a in Obj2; returns null for a in Obj2  
//missing value b in Obj1; returns null for b in Obj1
//undefined value b in Obj2; returns { b:undefined }
test('Simple Test 6', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { b: undefined }
  const testObj3 = { a: [{ match: false }, { a: 1 }, null], b: [{ match: false }, null, { b: undefined }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value a in Obj2; returns null for a in Obj2
//missing value b in Obj1; returns null for b in Obj1
test('Simple Test 7', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { b: 1 }
  const testObj3 = { a: [{ match: false }, { a: 1 }, null], b: [{ match: false }, null, { b: 1 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value b in Obj2; returns null for b in Obj2  
test('Simple Test 8', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: true }, { a: 1 }, { a: 1 }], b: [{ match: false }, { b: 2 }, null] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value b in Obj2; returns null for b in Obj2
//simple mis-match for value a 
test('Simple Test 9', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2 }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: 2 }], b: [{ match: false }, { b: 2 }, null] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value a in Obj2; returns null for a in Obj2
test('Simple Test 10', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { b: 2 }
  const testObj3 = { a: [{ match: false }, { a: 1 }, null], b: [{ match: true }, { b: 2 }, { b: 2 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value a in Obj2; returns null for a in Obj2
//simple mis-match for value b
test('Simple Test 11', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { b: 3 }
  const testObj3 = { a: [{ match: false }, { a: 1 }, null], b: [{ match: false }, { b: 2 }, { b: 3 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match for value a 
test('Simple Test 12', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2, b: 2 }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: 2 }], b: [{ match: true }, { b: 2 }, { b: 2 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match for value b
test('Simple Test 13', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: 3 }
  const testObj3 = { a: [{ match: true }, { a: 1 }, { a: 1 }], b: [{ match: false }, { b: 2 }, { b: 3 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match for values a and b 
test('Simple Test 14', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2, b: 3 }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: 2 }], b: [{ match: false }, { b: 2 }, { b: 3 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing equal values for a and b 
test('Simple Test 15', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: 2 }
  const testObj3 = { a: [{ match: true }, { a: 1 }, { a: 1 }], b: [{ match: true }, { b: 2 }, { b: 2 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing undefined b value in Obj2; returns { b: undefined }
test('Simple Test 16', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: undefined }
  const testObj3 = { a: [{ match: true }, { a: 1 }, { a: 1 }], b: [{ match: false }, { b: 2 }, { b: undefined }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})
//Testing empty string b value in Obj1; returns { b: '' }
test('Simple Test 17', (t) => { 
  const testObj1 = { a: 1, b: '' } 
  const testObj2 = { a: 1, b: 2 } 
  const testObj3 = { a: [{ match: true }, { a: 1 }, { a: 1 }], b: [{ match: false }, { b: '' }, { b: 2 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})
 
test('Simple Test 18', (t) => { 
  const testObj1 = { a: 1, b: null} 
  const testObj2 = { a: 1, b: 2 } 
  const testObj3 = { a: [{ match: true }, { a: 1 }, { a: 1 }], b: [{ match: false }, { b: null }, { b: 2 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match for value a 
//undefined b value in Obj2: returns { b: undefined }
test('Simple Test 19', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2, b: undefined }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: 2 }], b: [{ match: false }, { b: 2 }, { b: undefined }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing undefined value a in Obj1; returns { a: undefined }
//Missing values b-f in Obj2; returns null for each
test('Simple Test 20', (t) => {
  const testObj1 = {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
  }
  const testObj2 = { c: 1 }
  const testObj3 = {
    a: [{ match: false }, {
      a: undefined,
    },
    null,
    ],
    b: [{ match: false }, {
      b: undefined,
    },
    null],
    c: [{ match: false }, {
      c: undefined,
    }, {
      c: 1,
    }],
    d: [{ match: false }, {
      d: undefined,
    },
    null,
    ],
    e: [{ match: false }, {
      e: undefined,
    },
    null,
    ],
    f: [{ match: false }, {
      f: undefined,
    },
    null,
    ],
  }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  console.debug(result);
  t.deepEqual(result, testObj3)
})

//simple out of order test
test('Simple Test 21', (t) => {
  const original = { a: 1, b: 2, c: 3, d: 4 }
  const docA = { b:2 }
  const testObj3 = {
    a: [ { match:false }, null, { a:1 }],
    b: [ { match:true }, { b:2 }, { b:2 }],
    c: [ { match:false }, null, { c:3 }],
    d: [ { match: false }, null, { d:4 }], }
  const result = littleDiffer.compareJSON(docA, original)
  console.debug(result);
  t.deepEqual(result, testObj3)
})

//simple out of order test comparing both possible results
test('Simple Test 22', (t) => {
  const original = { a: 1, b: 2, c: 3, d: 4 }
  const docA = { b:2 }
  const expected = {
    a: [ { match:false }, { a:1 }, null ],
    b: [ { match:true }, { b:2 }, { b:2 }],
    c: [ { match:false }, { c:3 }, null],
    d: [ { match: false }, { d:4 }, null], }
  const result = littleDiffer.compareJSON(original, docA)
  t.deepEqual(result, expected)
})

//Testing equal null values
test('Simple Null Test 1', (t) => {
  const testObj1 = { a: null }
  const testObj2 = { a: null }
  const testObj3 = { a: [{match: true}, { a: null }, { a: null }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value a is null in Obj1 
test('Simple Null Test 2', (t) => { 
  const testObj1 = { a: null } 
  const testObj2 = { a: 1 } 
  const testObj3 = { a: [{match: false}, { a: null }, { a: 1 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2) 
  t.deepEqual(result, testObj3) 
})

//Testing value a is null in Obj2
test('Simple Null Test 3', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: null }
  const testObj3 = { a: [{match: false}, { a: 'hello' }, { a: null }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for value a containing nested val vs number
//value a is null in Obj1
//missing b value in obj1 returns as null
test('Simple Null Test 4', (t) => {
  const testObj1 = { a: null }
  const testObj2 = { a: { b: 3 } }
  const testObj3 = { a: [{ match: false }, { a: null }, { a: { b: [{ match: false }, null, { b: 3 }] } }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for value in obj1 containing nested value vs null in obj2
//missing b value in obj 1 returns null 
//null value in obj2 returns a: null
test('Simple Null Test 5', (t) => {
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: null }
  const testObj3 = { a: [{ match: false }, { a: { b: [{ match: false }, { b: 3 }, null ]} },{ a: null }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for nested value b containing null in Obj2 
test('Simple Null Test 6', (t) => {
  const testObj1 = { a: { b: 2 } }
  const testObj2 = { a: { b: null } }
  const testObj3 = { a: { b: [{ match: false }, { b: 2 }, { b: null}] } }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for nested value b containing null in Obj1
test('Simple Null Test 7', (t) => {
  const testObj1 = { a: { b: null } }
  const testObj2 = { a: { b: 2 } }
  const testObj3 = { a: { b: [{ match: false }, { b: null }, { b: 2}] } }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value containing null in Obj1, but missing in Obj2 
test('Simple Null Test 8', (t) => {
  const testObj1 = { test8: null }
  const testObj2 = { }
  const testObj3 = { test8: [{ match: false }, { test8: null }, null] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value containing null in Obj1, but missing in Obj2
test('Simple Null Test 9', (t) => { 
  const testObj1 = { a: null, b: 123 } 
  const testObj2 = { b: 123 } 
  const testObj3 = { a: [{ match: false }, { a: null }, null ], b: [{ match: true }, { b: 123}, { b: 123 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2) 
  t.deepEqual(result, testObj3) 
})

//Testing nested value containing null in Obj1, but missing in Obj2
test('Simple Null Test 10', (t) => { 
  const testObj1 = { a: { b: null } }
  const testObj2 = { a: 1 } 
  const testObj3 = { a: [{ match: false }, { a: { b: [{ match: false }, { b: null }, null ]}}, { a: 1 } ] }
  const result = littleDiffer.compareJSON(testObj1, testObj2) 
  t.deepEqual(result, testObj3); 
})

//Testing value containing null in Obj2, but missing in Obj1 
test('Simple Null Test 11', (t) => {
  const testObj1 = { }
  const testObj2 = { a: null }
  const testObj3 = { a: [ { match: false }, null, { a: null }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value containing null in Obj2, but missing in Obj1
test('Simple Null Test 12', (t) => {
  const testObj1 = { b: 123 }
  const testObj2 = { a: null, b: 123 }
  const testObj3 = { a: [ { match: false }, null, { a: null }], b: [{ match: true }, { b: 123}, { b: 123 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//still need to code for this: 
//Testing nested value containing null in Obj2, but missing in Obj1
//value b is null in Obj2
//missing b value in obj1 returns as null
test('Simple Null Test 13', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: { b: null } }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: { b: [{ match: false }, null, { b: null }] } }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})



//Testing Nested values with inner most c containing mis-match.
test('Complex Test 1', (t) => {
  const testObj1 = {
    a: {
      b: {
        c: 1,
      },
    },
  }
  const testObj2 = {
    a: {
      b: {
        c: 3,
      },
    },
  }
  const testObj3 = {
    a: {
      b: {
        c: [{ match: false }, { c: 1 }, { c: 3 }],
      },
    },
  }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match of value a
//mis-match of nested values
test('Complex Test 2', (t) => {
  const testObj1 = {
    a: 1,
    b: {
      a: 2,
    },
  }
  const testObj2 = {
    a: 2,
    b: {
      a: 1,
    },
  }
  const testObj3 = {
    a: [{ match: false }, { a: 1 }, { a: 2 }],
    b: {
      a: [{ match: false }, { a: 2 }, { a: 1 }],
    },
  }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing nested, Value c not located inside nested value - 
//value c is missing from nested a in Obj2; returns null
//Value c is missing after a in Obj1; returns null 
test('Complex Test 3', (t) => {
  const testObj1 = {
    a: {
      b: 1,
      c: 2,
    },
  }
  const testObj2 = {
    a: {
      b: 1,
    },
    c: 3,
  }
  const testObj3 = {
    a: {
      b: [{ match: true }, { b: 1 }, { b: 1 }],
      c: [{ match: false }, { c: 2 }, null],
    },
    c: [{ match: false }, null, { c: 3 }],
  }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for value a containing nested val vs number
//missing b value in obj2 returns as null
test('Nested Test 1', (t) => {
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: false }, { a: { b: [{ match: false }, { b: 3 }, null] } }, { a: 1 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for value a containing nest val vs number 
//missing b value in obj1 returns as null
test('Nested Test 2', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: { b: 3 } }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: { b: [{ match: false }, null, { b: 3 }] } }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing nested equal match
test('Nested Test 3', (t) => {
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: { b: 3 } }
  const testObj3 = { a: { b: [{ match: true }, { b: 3 }, { b: 3 }] } }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match of value b inside nested 
test('Nested Test 4', (t) => {
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: { b: 4 } }
  const testObj3 = { a: { b: [{ match: false }, { b: 3 }, { b: 4 }] } }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing empty json returns empty json 
test('Edge Test 1', (t) => {
  const testObj1 = { }
  const testObj2 = { }
  const testObj3 = { }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple value match 
test('Edge Test 2', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: true }, { a: 1 }, { a: 1 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple value match
test('Edge Test 4', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: 2 }
  const testObj3 = { a: [{ match: true }, { a: 1 }, { a: 1 }], b: [{ match: true }, { b: 2 }, { b: 2 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value mismatch
test('String Test 1', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: 'hello' }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple value match
test('String Test 2', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: true }, { a: 'hello' }, { a: 'hello' }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value mis-match of value a containing array vs simple value 
test('String Test 3', (t) => {
  const testObj1 = { a: ['hello', 'goodbye'] }
  const testObj2 = { a: 5 }
  const testObj3 = { a: [{ match: false }, { a: ['hello', 'goodbye'] }, { a: 5 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mismatch
test('String Test 4', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: false }, { a: 'hello' }, { a: 1 }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mismatch
test('String Test 5', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: 'goodbye' }
  const testObj3 = { a: [{ match: false }, { a: 'hello' }, { a: 'goodbye' }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mismatch of value a containing array vs simple string value
test('String Test 6', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: [5, 'goodbye'] }
  const testObj3 = { a: [{ match: false }, { a: 'hello' }, { a: [5, 'goodbye'] }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value a containing string vs nested value b containing string 
//missing value b in Obj2 returns null
test('String Test 7', (t) => {
  const testObj1 = { a: { b: 'hello' } }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: false }, { a: { b: [{ match: false }, { b: 'hello' }, null] } }, { a: 'hello' }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mismatch value a number vs string 
test('String Test 8', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: false }, { a: 1 }, { a: 'hello' }] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mismatch nested strings 
test('String Test 9', (t) => {
  const testObj1 = { a: { b: 'hello' } }
  const testObj2 = { a: { b: 'goodbye' } }
  const testObj3 = { a: { b: [{ match: false }, { b: 'hello' }, { b: 'goodbye' }] } }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value b in Obj2 returns null
test('String Test 10', (t) => {
  const testObj1 = { a: 'hello', b: 'goodbye' }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: true }, { a: 'hello' }, { a: 'hello' }], b: [{ match: false }, { b: 'goodbye' }, null] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value b in Obj2 returns null (duplicate test)
test('String Test 11', (t) => {
  const testObj1 = { a: 'hello', b: 'goodbye' }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: true }, { a: 'hello' }, { a: 'hello' }], b: [{ match: false }, { b: 'goodbye' }, null] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing string value a in Obj2  returns null 
test('String Test 12', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { }
  const testObj3 = { a: [{ match: false }, { a: 'hello' }, null] }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing string values a-d in Obj2, returns null for each 
test('String Test 13', (t) => {
  const testObj1 = {
    a: 'hello',
    b: 'goodbye',
    c: 'apple',
    d: 'pear',
  }
  const testObj2 = {}
  const testObj3 = {
    a: [{ match: false }, { a: 'hello' }, null],
    b: [{ match: false }, { b: 'goodbye' }, null],
    c: [{ match: false }, { c: 'apple' }, null],
    d: [{ match: false }, { d: 'pear' }, null],
  }
  const result = littleDiffer.compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Match With Array Test 1', (t) => {
  const nestedMatchWithArrayTest1 = { a: { b: 2, c: 3 }, j: [10, 9, 8] }
  const originalNestedMatchWithArrayTest1 = { a: { b: 2, c: 3 }, j: [10, 9, 8] }

  const expectedResult = {"a":{"b":[{"match":true},{"b":2},{"b":2}],"c":[{"match":true},{"c":3},{"c":3}]},"j":[{"match":true},{"j":[10,9,8]},{"j":[10,9,8]}]}

  const result = littleDiffer.compareJSON(nestedMatchWithArrayTest1, originalNestedMatchWithArrayTest1)
  t.deepEqual(result, expectedResult)
})

