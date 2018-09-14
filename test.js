/**
* @name littleDiffer.js
* @author Juliet Adams and Sara Kim
* @description testing for compareJSON function
*/

import test from 'ava'
import { compareJSON } from './lib/littleDiffer.js'

test('Simple Test 1', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { }
  const testObj3 = { a: [{ a: 1 }, null] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 2', (t) => {
  const testObj1 = { }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [null, { a: 1 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 3', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: undefined }
  const testObj3 = { a: [{ a: 1 }, { a: undefined }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 4', (t) => {
  const testObj1 = { a: undefined }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ a: undefined }, { a: 1 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 5', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: 2 }
  const testObj3 = { a: [{ a: 1 }, { a: 2 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 6', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { b: undefined }
  const testObj3 = { a: [{ a: 1 }, null], b: [null, { b: undefined }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 7', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { b: 1 }
  const testObj3 = { a: [{ a: 1 }, null], b: [null, { b: 1 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 8', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ a: 1 }, { a: 1 }], b: [{ b: 2 }, null] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 9', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2 }
  const testObj3 = { a: [{ a: 1 }, { a: 2 }], b: [{ b: 2 }, null] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 10', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { b: 2 }
  const testObj3 = { a: [{ a: 1 }, null], b: [{ b: 2 }, { b: 2 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 11', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { b: 3 }
  const testObj3 = { a: [{ a: 1 }, null], b: [{ b: 2 }, { b: 3 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 12', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2, b: 2 }
  const testObj3 = { a: [{ a: 1 }, { a: 2 }], b: [{ b: 2 }, { b: 2 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 13', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: 3 }
  const testObj3 = { a: [{ a: 1 }, { a: 1 }], b: [{ b: 2 }, { b: 3 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 14', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2, b: 3 }
  const testObj3 = { a: [{ a: 1 }, { a: 2 }], b: [{ b: 2 }, { b: 3 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 15', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: 2 }
  const testObj3 = { a: [{ a: 1 }, { a: 1 }], b: [{ b: 2 }, { b: 2 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 16', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: undefined }
  const testObj3 = { a: [{ a: 1 }, { a: 1 }], b: [{ b: 2 }, { b: undefined }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 17', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2, b: undefined }
  const testObj3 = { a: [{ a: 1 }, { a: 2 }], b: [{ b: 2 }, { b: undefined }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 18', (t) => {
  const testObj1 = {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
  }
  const testObj2 = { a: 1 }
  const testObj3 = {
    a: [{
      a: undefined,
    }, {
      a: 1,
    }],
    b: [{
      b: undefined,
    },
      null],
    c: [{
      c: undefined,
    },
      null,
    ],
    d: [{
      d: undefined,
    },
      null,
    ],
    e: [{
      e: undefined,
    },
      null,
    ],
    f: [{
      f: undefined,
    },
      null,
    ],
  }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

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
        c: [{ c: 1 }, { c: 3 }],
      },
    },
  }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

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
    a: [{ a: 1 }, { a: 2 }],
    b: {
      a: [{ a: 2 }, { a: 1 }],
    },
  }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

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
      b: [{ b: 1 }, { b: 1 }],
      c: [{ c: 2 }, null],
    },
    c: [null, { c: 3 }],
  }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Nested Test 1', (t) => {
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ a: { b: [{ b: 3 }, null] } }, { a: 1 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Nested Test 2', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: { b: 3 } }
  const testObj3 = { a: [{ a: 1 }, { a: { b: [null, { b: 3 }] } }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Nested Test 3', (t) => {
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: { b: 3 } }
  const testObj3 = { a: { b: [{ b: 3 }, { b: 3 }] } }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Nested Test 4', (t) => {
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: { b: 4 } }
  const testObj3 = { a: { b: [{ b: 3 }, { b: 4 }] } }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Edge Test 1', (t) => {
  const testObj1 = { }
  const testObj2 = { }
  const testObj3 = { }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Edge Test 2', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ a: 1 }, { a: 1 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Edge Test 3', (t) => {
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: 2 }
  const testObj3 = { a: [{ a: 1 }, { a: 1 }], b: [{ b: 2 }, { b: 2 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 1', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ a: 1 }, { a: 'hello' }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 2', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ a: 'hello' }, { a: 'hello' }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 3', (t) => {
  const testObj1 = { a: ['hello', 'goodbye'] }
  const testObj2 = { a: 5 }
  const testObj3 = { a: [{ a: ['hello', 'goodbye'] }, { a: 5 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 4', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ a: 'hello' }, { a: 1 }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 5', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: 'goodbye' }
  const testObj3 = { a: [{ a: 'hello' }, { a: 'goodbye' }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 6', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: [5, 'goodbye'] }
  const testObj3 = { a: [{ a: 'hello' }, { a: [5, 'goodbye'] }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 7', (t) => {
  const testObj1 = { a: { b: 'hello' } }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ a: { b: [{ b: 'hello' }, null] } }, { a: 'hello' }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 8', (t) => {
  const testObj1 = { a: 1 }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ a: 1 }, { a: 'hello' }] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 9', (t) => {
  const testObj1 = { a: { b: 'hello' } }
  const testObj2 = { a: { b: 'goodbye' } }
  const testObj3 = { a: { b: [{ b: 'hello' }, { b: 'goodbye' }] } }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 10', (t) => {
  const testObj1 = { a: 'hello', b: 'goodbye' }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ a: 'hello' }, { a: 'hello' }], b: [{ b: 'goodbye' }, null] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 11', (t) => {
  const testObj1 = { a: 'hello', b: 'goodbye' }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ a: 'hello' }, { a: 'hello' }], b: [{ b: 'goodbye' }, null] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 12', (t) => {
  const testObj1 = { a: 'hello' }
  const testObj2 = { }
  const testObj3 = { a: [{ a: 'hello' }, null] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('String Test 13', (t) => {
  const testObj1 = { a: 'hello', b: 'goodbye', c: 'apple', d: 'pear' }
  const testObj2 = { }
  const testObj3 = { a: [{ a: 'hello' }, null], b: [{ b: 'goodbye' }, null], c: [{ c: 'apple' }, null], d: [{ d: 'pear' }, null] }
  const result = compareJSON(testObj1, testObj2)
  t.deepEqual(result, testObj3)
})
