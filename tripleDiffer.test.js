/**
* @name littleDiffer.js
* @author Marita Carballo
* @description testing for compareTripleJSON function
*/
const test = require('ava');
const tripleDiffer = require('./lib/tripleDiffer.js');
var constants = require("./constants.js");

const MATCH_VALUE = constants.MATCH_VALUE;

if (process.argv[2] === 'verbose') {
console.debugging = true;
}
else {
console.debugging = false;
}
console.debug("Beginning tests in tripleDiffer.test.js");

//All following tests are for when all objects have the key
//Testing simple equal key test
test('Simple Match Test 1', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1 }

  const expected = { a: [ { match: MATCH_VALUE.ALL_EQUAL }, { a: 1 }, { a: 1 }, { a: 1 } ]}
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(result);
  t.deepEqual(result, expected)
})

//Testing simple mismatch key test
test('Simple Mismatch Test 1', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 2 }
  const testObj2 = { a: 3 }

  const expected = { a: [ { match: MATCH_VALUE.ALL_DIFF }, { a: 1 }, { a: 2 }, { a: 3 } ]}
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(result);
  t.deepEqual(result, expected)
})

//Testing single array test 1
test('Single array in orig Test 1', (t) => {
  const testOrig = { a: [ 1, 2 ]}
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1 }

  const expected = { a: [ { match: MATCH_VALUE.MODS_MATCH }, { a: [ 1, 2 ] }, { a: 1 }, { a: 1 } ]}
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(result);
  t.deepEqual(result, expected)
})

//Testing single array test 1
test('Single array in obj1 Test 2', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: [ 1, 2 ] }
  const testObj2 = { a: 1 }

  const expected = { a: [ { match: MATCH_VALUE.ORIG_MATCH_B }, { a: 1 }, { a: [ 1, 2 ] }, { a: 1 } ]}
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(result);
  t.deepEqual(result, expected)
})

//Testing single array test 1
test('Single array in obj2 Test 3', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: [ 1, 2 ] }

  const expected = { a: [ { match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: [ 1, 2 ] } ]}
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(result);
  t.deepEqual(result, expected)
})

//Testing single array test 1
test('Equal arrays Test 1', (t) => {
  const testOrig = { a: [ 1, 2 ] }
  const testObj1 = { a: [ 1, 2 ] }
  const testObj2 = { a: [ 1, 2 ] }

  const expected = { a: [ { match: MATCH_VALUE.ALL_EQUAL }, { a: [ 1, 2 ] }, { a: [ 1, 2 ] }, { a: [ 1, 2 ] } ]}
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(result);
  t.deepEqual(result, expected)
})

//Testing all three null
test('All Null Test 1', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: null }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: null }, { a: null }, { a: null }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, expected)
})

//Testing 2 null and 1 object - #1
test('Two Null Test 1 Object 1', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: null }
  const testObj2 = { a: { b: 3 } }
  const expected = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: null }, { a: null }, { a: { b: [{ match : MATCH_VALUE.ALL_DIFF }, null, null, { b : 3 }] } }] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing 2 null and 1 object - #2
test('Two Null Test 1 Object 2', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.ORIG_MATCH_B }, { a: null }, { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF}, null, { b : 3 }, null ]}}, { a: null }] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing 2 null and 1 object - #3
test('Two Null Test 1 Object 3', (t) => {
  const testOrig = { a: { b: 3 } }
  const testObj1 = { a: null }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.MODS_MATCH }, { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 3 }, null, null ]}}, { a: null }, { a: null }] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing 2 objects and 1 null - #1
test('Two Objects Test 1 Null 1 - objects match ', (t) => {
  const testOrig = { a: { b: 3 } }
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a:{ b: [{ match : MATCH_VALUE.ORIG_MATCH_A }, { b : 3 }, { b : 3 }, null] } },
                                           { a:{ b: [{ match : MATCH_VALUE.ORIG_MATCH_A }, { b : 3 }, { b : 3 }, null] } },
                                           { a: null } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing 2 objects and 1 null - #2
test('Two Objects Test 1 Null 1 - objects mismatch ', (t) => {
  const testOrig = { a: { b: 3 } }
  const testObj1 = { a: { b: 4 } }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 3 }, { b : 4 }, null] } },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 3 }, { b : 4 }, null] } },
                                           { a: null } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing 2 objects and 1 null - #3
test('Two Objects Test 1 Null 2 - objects mismatch ', (t) => {
  const testOrig = { a: { b: 3 } }
  const testObj1 = { a: null }
  const testObj2 = { a: { b: 4 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 3 }, null, { b : 4 }] } },
                                           { a: null },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 3 }, null, { b : 4 }] } } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing 2 objects and 1 null - #4
test('Two Objects Test 1 Null 3 - objects mismatch ', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: { b: 4 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: null },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 3 }, { b : 4 }] } },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 3 }, { b : 4 }] } } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing 2 null values and 1 value is not object #1
test('Two Null & 1 not object  ', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: null }
  const testObj2 = { a: 4 }
  const expected = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: null },
                                           { a: null },
                                           { a: 4 } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing 2 null values and 1 value is not object #2
test('Two Null & 1 not object  #2', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: 4 }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.ORIG_MATCH_B }, { a: null },
                                           { a: 4 },
                                           { a: null } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing 2 null values and 1 value is not object #3
test('Two Null & 1 not object  #3', (t) => {
  const testOrig = { a: 4 }
  const testObj1 = { a: null }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.MODS_MATCH }, { a: 4 },
                                           { a: null },
                                           { a: null } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing if 2 values are not objects, and 1 is null
test('Two simple values that are not objects & 1 null #1', (t) => {
  const testOrig = { a: 3 }
  const testObj1 = { a: 4 }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: 3 },
                                           { a: 4 },
                                           { a: null } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing if 2 values are not objects, and 1 is null
test('Two simple values that are not objects & 1 null #2', (t) => {
  const testOrig = { a: 3 }
  const testObj1 = { a: null }
  const testObj2 = { a: 4 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: 3 },
                                           { a: null },
                                           { a: 4 } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//Testing if 2 values are not objects, and 1 is null
test('Two simple values that are not objects & 1 null #3', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: 3 }
  const testObj2 = { a: 4 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: null },
                                           { a: 3 },
                                           { a: 4 } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})


//1 is null and 1 is object and 1 is not object (6 tests)
test('1 is null, 1 is object, 1 is not object #1', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: 4 }
  const testObj2 = { a: { b: 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: null },
                                           { a: 4 },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, null, { b : 1 }] } } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('1 is null, 1 is object, 1 is not object #2', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: { b: 1 } }
  const testObj2 = { a: 4 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: null },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 1 }, null] } },
                                           { a: 4 } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('1 is null, 1 is object, 1 is not object #3', (t) => {
  const testOrig = { a: { b: 1 } }
  const testObj1 = { a: null }
  const testObj2 = { a: 4 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, null, null ] } },
                                               { a: null },
                                               { a: 4 } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('1 is null, 1 is object, 1 is not object #4', (t) => {
  const testOrig = { a: 4 }
  const testObj1 = { a: null }
  const testObj2 = { a: { b: 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: 4 },
                                           { a: null },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, null, { b : 1 }] } } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('1 is null, 1 is object, 1 is not object #5', (t) => {
  const testOrig = { a: 4 }
  const testObj1 = { a: { b: 1 } }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: 4 },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 1 }, null ] } },
                                           { a: null } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('1 is null, 1 is object, 1 is not object #6', (t) => {
  const testOrig = { a: { b: 1 } }
  const testObj1 = { a: 4 }
  const testObj2 = { a: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, null, null ] } },
                                           { a: 4 },
                                           { a: null } ] }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//all 3 of them are objects - matching
test('3 matching objects', (t) => {
  const testOrig = { a: { b: 1 } }
  const testObj1 = { a: { b: 1 } }
  const testObj2 = { a: { b: 1 } }
  const expected = { a:{ b: [{ match : MATCH_VALUE.ALL_EQUAL }, { b : 1 }, { b : 1 }, { b : 1 } ] } }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//all 3 of them are objects - mismatch
test('3 objects mismatched', (t) => {
  const testOrig = { a: { b: 1 } }
  const testObj1 = { a: { b: 2 } }
  const testObj2 = { a: { b: 3 } }
  const expected = { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, { b : 2 }, { b : 3 } ] } }


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//2 are objects and 1 is not an object (3 checks)
test('2 objects and 1 not object #1 ', (t) => {
  const testOrig = { a: { b: 1 } }
  const testObj1 = { a: { b: 2 } }
  const testObj2 = { a: 3 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, { b : 2 }, null ] } },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, { b : 2 }, null ] } },
                                           { a: 3 } ] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('2 objects and 1 not object #2 ', (t) => {
  const testOrig = { a: { b: 1 } }
  const testObj1 = { a: 3 }
  const testObj2 = { a: { b: 2 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, null, { b : 2 } ] } },
                                           { a: 3 },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, null, { b : 2 } ] } } ] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('2 objects and 1 not object #3 ', (t) => {
  const testOrig = { a: 3 }
  const testObj1 = { a: { b: 1 } }
  const testObj2 = { a: { b: 2 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: 3 },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 1 }, { b : 2 } ] } },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 1 }, { b : 2 } ] } } ] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

//1 is object and 2 are not objects (3 checks)
test('1 objects and 2 not object #1 ', (t) => {
  const testOrig = { a: { b: 1 } }
  const testObj1 = { a: 3 }
  const testObj2 = { a: 3 }
  const expected = { a: [{ match: MATCH_VALUE.MODS_MATCH }, { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, null, null ] } },
                                           { a: 3 },
                                           { a: 3 } ] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('1 objects and 2 not object #2 ', (t) => {
  const testOrig = { a: 3 }
  const testObj1 = { a: { b: 1 } }
  const testObj2 = { a: 3 }
  const expected = { a: [{ match: MATCH_VALUE.ORIG_MATCH_B }, { a: 3 },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 1 }, null ] } },
                                           { a: 3 } ] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('1 objects and 2 not object #3 ', (t) => {
  const testOrig = { a: 3 }
  const testObj1 = { a: 3 }
  const testObj2 = { a: { b: 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 3 },
                                           { a: 3 },
                                           { a:{ b: [{ match : MATCH_VALUE.ALL_DIFF }, null, null, { b : 1 } ] } } ] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

// if this key is only found in original document and not the other two
          //it is an array

test('orig has array in key b but other docs dont ', (t) => {
  const testOrig = { a: 1, b: [ 1, 2 ] }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: [ 1, 2 ] }, null, null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //it is a not null object
test('orig has an object in key b but other docs dont ', (t) => {
  const testOrig = { a: 1, b: { b: 1 } }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: { b: [{ match : MATCH_VALUE.ALL_DIFF}, { b : 1 }, null, null ] } },
                                           null,
                                           null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //it is null
test('orig has null key b but other docs dont ', (t) => {
  const testOrig = { a: 1, b: null }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: null }, null, null ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
        //else ...
test('orig has key b but other docs dont ', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: 2 }, null, null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

// if this key is found in original and obj1 documents, but not obj2
      //one is array
test('orig and obj1 has array in key b but obj2 doesnt ', (t) => {
  const testOrig = { a: 1, b: [ 1, 2 ] }
  const testObj1 = { a: 1, b: [ 1, 2 ] }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: [ 1, 2 ] }, { b: [ 1, 2 ] }, null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('orig and obj1 has key b, orig is array, obj2 doesnt have the key', (t) => {
  const testOrig = { a: 1, b: [ 1, 2 ] }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: [ 1, 2 ] }, { b: 2 }, null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
test('orig and obj1 has key b, obj1 is array, obj2 doesnt have the key', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: [ 1, 2 ] }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: 2 }, { b: [ 1, 2 ] }, null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //both are null
test('orig and obj1 has key b - both are null, obj2 doesnt have the key', (t) => {
  const testOrig = { a: 1, b: null }
  const testObj1 = { a: 1, b: null }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: null }, { b: null }, null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //one is null and other is object (2 tests)
test('orig and obj1 has key b - one is null, one is object, obj2 doesnt have the key #1', (t) => {
  const testOrig = { a: 1, b: null }
  const testObj1 = { a: 1, b: { b: 1 } }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: null },
                                           { b: { b: [{ match : MATCH_VALUE.ALL_DIFF}, null, { b : 1 }, null ] } },
                                           null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('orig and obj1 has key b - one is null, one is object, obj2 doesnt have the key #2', (t) => {
  const testOrig = { a: 1, b: { b: 1 } }
  const testObj1 = { a: 1, b: null }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: { b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, null, null ] }},
                                           { b: null },
                                           null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //one is null and other is not object ( 2 tests)
test('orig and obj1 has key b - one is null, one is not object, obj2 doesnt have the key #1', (t) => {
  const testOrig = { a: 1, b: 'string value' }
  const testObj1 = { a: 1, b: null }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: 'string value' },
                                           { b: null },
                                           null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
test('orig and obj1 has key b - one is null, one is not object, obj2 doesnt have the key #2', (t) => {
  const testOrig = { a: 1, b: null }
  const testObj1 = { a: 1, b: 'string value' }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: null },
                                           { b: 'string value' },
                                           null ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //both are not null objects
test('orig and obj1 has key b - both are objects, obj2 doesnt have the key ', (t) => {
  const testOrig = { a: 1, b: { b: 1 } }
  const testObj1 = { a: 1, b: { b: 1 } }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: { b: [{ match : MATCH_VALUE.ORIG_MATCH_A}, { b : 1 }, { b : 1 }, null ] } },
                                           { b: { b: [{ match : MATCH_VALUE.ORIG_MATCH_A}, { b : 1 }, { b : 1 }, null ] } },
                                           null ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //one is object and other is not an object (2 tests)
test('orig and obj1 has key b - one is object, one is not object, obj2 doesnt have the key #1', (t) => {
  const testOrig = { a: 1, b: { b: 1 } }
  const testObj1 = { a: 1, b: 'string value' }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: { b: [{ match : MATCH_VALUE.ALL_DIFF}, { b : 1 }, null, null ] } },
                                           { b: 'string value' },
                                           null ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('orig and obj1 has key b - one is object, one is not object, obj2 doesnt have the key #2', (t) => {
  const testOrig = { a: 1, b: 'string value' }
  const testObj1 = { a: 1, b: { b: 1 } }
  const testObj2 = { a: 1 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: 'string value' },
                                           { b: { b: [{ match : MATCH_VALUE.ALL_DIFF}, null, { b : 1 }, null ] } },
                                           null ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

// if this key is found in original and obj2 documents, but not obj1
      //one is array
test('orig and obj2 has array in key b but obj1 doesnt ', (t) => {
  const testOrig = { a: 1, b: [ 1, 2 ] }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: [ 1, 2 ] }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ORIG_MATCH_B }, { b: [ 1, 2 ] }, null, { b: [ 1, 2 ] } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('orig and obj2 has key b, orig is array, obj1 doesnt have the key', (t) => {
  const testOrig = { a: 1, b: [ 1, 2 ] }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: 2 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: [ 1, 2 ] }, null, { b: 2 } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
test('orig and obj2 has key b, obj2 is array, obj1 doesnt have the key', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: [ 1, 2 ] }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: 2 }, null, { b: [ 1, 2 ] } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

      //both are null
test('orig and obj2 has key b - both are null, obj1 doesnt have the key', (t) => {
  const testOrig = { a: 1, b: null }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ORIG_MATCH_B }, { b: null }, null, { b: null } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //one is null and other is object (2 tests)
test('orig and obj2 has key b - one is null, one is object, obj1 doesnt have the key #1', (t) => {
  const testOrig = { a: 1, b: null }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: { b: 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: null },
                                           null,
                                           { b: { b: [{ match : MATCH_VALUE.ALL_DIFF}, null, null, { b : 1 } ] } } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('orig and obj2 has key b - one is null, one is object, obj1 doesnt have the key #2', (t) => {
  const testOrig = { a: 1, b: { b: 1 } }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: { b: [{ match : MATCH_VALUE.ALL_DIFF}, { b : 1 }, null, null ] } },
                                           null,
                                           { b: null } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

      //one is null and other is not object ( 2 tests)
test('orig and obj2 has key b - one is null, one is not object, obj1 doesnt have the key #1', (t) => {
  const testOrig = { a: 1, b: 'string value' }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: 'string value' },
                                           null,
                                           { b: null } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
test('orig and obj2 has key b - one is null, one is not object, obj1 doesnt have the key #2', (t) => {
  const testOrig = { a: 1, b: null }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: 'string value' }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: null },
                                           null,
                                           { b: 'string value' } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //both are not null objects
test('orig and obj2 has key b - both are objects, obj1 doesnt have the key ', (t) => {
  const testOrig = { a: 1, b: { b: 1 } }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: { b: 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ORIG_MATCH_B }, { b: { b: [{ match : MATCH_VALUE.ORIG_MATCH_B }, { b : 1 }, null, { b : 1 } ] } },
                                           null,
                                           { b: { b: [{ match : MATCH_VALUE.ORIG_MATCH_B }, { b : 1 }, null, { b : 1 } ] } } ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
      //one is object and other is not an object (2 tests)
test('orig and obj2 has key b - one is object, one is not object, obj1 doesnt have the key #1', (t) => {
  const testOrig = { a: 1, b: { b: 1 } }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: 'string value' }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: { b: [{ match : MATCH_VALUE.ALL_DIFF }, { b : 1 }, null, null ] } } ,
                                           null,
                                           { b: 'string value' } ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('orig and obj2 has key b - one is object, one is not object, obj1 doesnt have the key #2', (t) => {
  const testOrig = { a: 1, b: 'string value' }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: { b: 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, { b: 'string value' },
                                           null,
                                           { b: { b: [{ match : MATCH_VALUE.ALL_DIFF }, null, null, { b : 1 } ] } } ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
// if there is a key in document1 that is not in the original document
     //If obj2 has the key - and one is array
test('obj1 and obj2 has array in key b but orig doesnt ', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1, b: [ 1, 2 ] }
  const testObj2 = { a: 1, b: [ 1, 2 ] }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.MODS_MATCH }, null, { b: [ 1, 2 ] }, { b: [ 1, 2 ] } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('obj1 and obj2 has key b, obj1 is array, orig doesnt have the key', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1, b: [ 1, 2 ] }
  const testObj2 = { a: 1, b: 2 }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null, { b: [ 1, 2 ] }, { b: 2 } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
test('obj1 and obj2 has key b, obj2 is array, orig doesnt have the key', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: [ 1, 2 ] }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null, { b: 2 }, { b: [ 1, 2 ] } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
     //if obj2 has the key - and both are null
test('obj1 and obj2 has key b - both are null, orig doesnt have the key', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1, b: null }
  const testObj2 = { a: 1, b: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.MODS_MATCH }, null, { b: null }, { b: null } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
     //If obj2 has the key - and one is null and other is object (2 checks)
test('obj1 and obj2 has key b - one is null, one is object, orig doesnt have the key #1', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1, b: null }
  const testObj2 = { a: 1, b: { b: 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           { b: null },
                                           { b: { b: [{ match : MATCH_VALUE.ALL_DIFF }, null, null, { b : 1 } ] } } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('obj1 and obj2 has key b - one is null, one is object, orig doesnt have the key #2', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1, b: { b: 1 } }
  const testObj2 = { a: 1, b: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           { b: { b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 1 }, null ] } },
                                           { b: null } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

     //If obj2 has the key - and one is null and other is not object (2 checks)
test('obj1 and obj2 has key b - one is null, one is not object, orig doesnt have the key #1', (t) => {
  const testOrig = { a: 1}
  const testObj1 = { a: 1, b: null }
  const testObj2 = { a: 1, b: 'string value' }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           { b: null },
                                           { b: 'string value' } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
test('obj1 and obj2 has key b - one is null, one is not object, orig doesnt have the key #2', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1, b: 'string value' }
  const testObj2 = { a: 1, b: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                           { a: 1 },
                                           { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           { b: 'string value' },
                                           { b: null } ]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})


     //If obj2 has the key - and both are not null objects
test('obj1 and obj2 has key b - both are objects, orig doesnt have the key ', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1, b: { b: 1 } }
  const testObj2 = { a: 1, b: { b: 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.MODS_MATCH }, null,
                                           { b: { b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 1 }, { b : 1 } ] } },
                                           { b: { b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 1 }, { b : 1 } ] } } ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
     //If obj2 has the key - and one is object and other is not object (2 checks)
test('obj1 and obj2 has key b - one is object, one is not object, orig doesnt have the key #1', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1, b: { b: 1 } }
  const testObj2 = { a: 1, b: 'string value' }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           { b: { b: [{ match : MATCH_VALUE.ALL_DIFF }, null, { b : 1 }, null ] } },
                                           { b: 'string value' } ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

test('obj1 and obj2 has key b - one is object, one is not object, orig doesnt have the key #2', (t) => {
  const testOrig = { a: 1}
  const testObj1 = { a: 1, b: 'string value' }
  const testObj2 = { a: 1, b: { b: 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           { b: 'string value' },
                                           { b : { b: [{ match : MATCH_VALUE.ALL_DIFF }, null, null, { b : 1 } ] } } ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})

     //If obj2 has the key - and else...
test('obj1 and obj2 has key b; orig doesnt have the key ', (t) => {
  const testOrig = { a: 1}
  const testObj1 = { a: 1, b: 'string value' }
  const testObj2 = { a: 1, b: 'string value' }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           { b: 'string value' },
                                           { b: 'string value' } ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
//If there is a key in document2 that is not in the original document and not in obj1
     //If array
test('obj2 has array in key b; orig and obj1 dont have the key ', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: [ 1, 2 ] }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           null,
                                           { b: [ 1, 2 ] } ]}


  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
     //If not null and object
test('obj2 has object in key b; orig and obj1 dont have the key ', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: { b : 1 } }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           null,
                                           { b: {b: [{ match : MATCH_VALUE.ALL_DIFF}, null, null, { b : 1 } ] } } ]}



  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})
     //if null
test('obj2 has null key b; orig and obj1 dont have the key ', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1, b: null }
  const expected = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 },
                                          { a: 1 },
                                          { a: 1 } ],
                     b: [{ match: MATCH_VALUE.ALL_DIFF }, null,
                                           null,
                                           { b: null } ] }



  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, expected)
})


//all the other checks below with null, undefined, nested objects


//Testing undefined value a in Obj2; returns { a: undefined }
test('Simple Test 3', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: undefined }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: undefined }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));
  t.deepEqual(result, testObj3)
})

//Testing undefined value a in Obj1; returns { a:undefined }
test('Simple Test 4', (t) => {
  const testOrig = { a: undefined }
  const testObj1 = { a: undefined }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: undefined }, { a: undefined }, { a: 1 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(JSON.stringify(result));

  t.deepEqual(result, testObj3)
})

//Testing simple mis-match of value a
test('Simple Test 5', (t) => {
  const testOrig = { a: 0 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 2 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: 0 }, { a: 1 }, { a: 2 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value a in Obj2; returns null for a in Obj2
//missing value b in Obj1; returns null for b in Obj1
//undefined value b in Obj2; returns { b:undefined }
test('Simple Test 6', (t) => {
  const testOrig = { a: undefined }
  const testObj1 = { a: 1 }
  const testObj2 = { b: undefined }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: undefined }, { a: 1 }, null], b: [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { b: undefined }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value a in Obj2; returns null for a in Obj2
//missing value b in Obj1; returns null for b in Obj1
test('Simple Test 7', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { b: 1 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, null], b: [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { b: 1 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value b in Obj2; returns null for b in Obj2
test('Simple Test 8', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 }, { a: 1 }, { a: 1 }], b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 2 }, { b: 2 }, null] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value b in Obj2; returns null for b in Obj2
//simple mis-match for value a
test('Simple Test 9', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: 2 }], b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 2 }, { b: 2 }, null] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value a in Obj2; returns null for a in Obj2
test('Simple Test 10', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { b: 2 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, null], b: [{ match: MATCH_VALUE.ALL_EQUAL }, { b: 2 }, { b: 2 }, { b: 2 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value a in Obj2; returns null for a in Obj2
//simple mis-match for value b
test('Simple Test 11', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { b: 3 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, null], b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 2 }, { b: 2 }, { b: 3 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match for value a
test('Simple Test 12', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2, b: 2 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: 2 }], b: [{ match: MATCH_VALUE.ALL_EQUAL }, { b: 2 }, { b: 2 }, { b: 2 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match for value b
test('Simple Test 13', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: 3 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 }, { a: 1 }, { a: 1 }], b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 2 }, { b: 2 }, { b: 3 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match for values a and b
test('Simple Test 14', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2, b: 3 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: 2 }], b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 2 }, { b: 2 }, { b: 3 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing equal values for a and b
test('Simple Test 15', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: 2 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 }, { a: 1 }, { a: 1 }], b: [{ match: MATCH_VALUE.ALL_EQUAL }, { b: 2 }, { b: 2 }, { b: 2 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing undefined b value in Obj2; returns { b: undefined }
test('Simple Test 16', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: undefined }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 }, { a: 1 }, { a: 1 }], b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 2 }, { b: 2 }, { b: undefined }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing empty string b value in Obj1; returns { b: '' }
test('Simple Test 17', (t) => {
  const testOrig = { a: 1, b: '' }
  const testObj1 = { a: 1, b: '' }
  const testObj2 = { a: 1, b: 2 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 }, { a: 1 }, { a: 1 }], b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b : '' }, { b: '' }, { b: 2 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Simple Test 18', (t) => {
  const testOrig = { a: 1, b: null}
  const testObj1 = { a: 1, b: null}
  const testObj2 = { a: 1, b: 2 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 }, { a: 1 }, { a: 1 }], b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: null }, { b: null }, { b: 2 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match for value a
//undefined b value in Obj2: returns { b: undefined }
test('Simple Test 19', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 2, b: undefined }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: 2 }], b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 2 }, { b: 2 }, { b: undefined }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing undefined value a in Obj1; returns { a: undefined }
//Missing values b-f in Obj2; returns null for each
test('Simple Test 20', (t) => {
  const testOrig = {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
  }
  const testObj1 = {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
  }
  const testObj2 = { c: 1 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: undefined }, { a: undefined }, null],
                     b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: undefined }, { b: undefined }, null],
                     c: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { c: undefined }, { c: undefined }, { c: 1 }],
                     d: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { d: undefined }, { d: undefined }, null],
                     e: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { e: undefined }, { e: undefined }, null],
                     f: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { f: undefined }, { f: undefined }, null] }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(result);
  t.deepEqual(result, testObj3)
})

//simple out of order test
test('Simple Test 21', (t) => {
  const testOrig = { a: 1, b: 2, c: 3, d: 4 }
  const testObj1 = { a: 1, b: 2, c: 3, d: 4 }
  const testObj2 = { b:2 }
  const testObj3 = {
    a: [ { match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, null],
    b: [ { match: MATCH_VALUE.ALL_EQUAL }, { b: 2 }, { b: 2 }, { b: 2 }],
    c: [ { match: MATCH_VALUE.ORIG_MATCH_A }, { c: 3 }, { c: 3 }, null ],
    d: [ { match: MATCH_VALUE.ORIG_MATCH_A }, { d: 4 }, { d: 4 }, null ] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug(result);
  t.deepEqual(result, testObj3)
})

//simple out of order test comparing both possible results
test('Simple Test 22', (t) => {
  const testOrig = { a: 1, b: 2, c: 3, d: 4 }
  const testObj1 = { a: 1, b: 2, c: 3, d: 4 }
  const testObj2 = { b: 2 }
  const expected = {
    a: [ { match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, null ],
    b: [ { match: MATCH_VALUE.ALL_EQUAL }, { b: 2 }, { b: 2 }, { b: 2 }],
    c: [ { match: MATCH_VALUE.ORIG_MATCH_A }, { c: 3 }, { c: 3 }, null],
    d: [ { match: MATCH_VALUE.ORIG_MATCH_A }, { d: 4 }, { d: 4 }, null], }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, expected)
})

//Testing missing value a in Obj2; returns null for a in Obj2
//missing value b in Obj1; returns null for b in Obj1
//Also testing Assigned value of null for a in orig
test('Simple Test 23', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: 1 }
  const testObj2 = { b: 1 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_DIFF }, { a: null}, { a: 1 }, null], b: [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { b: 1 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing equal null values
test('Simple Null Test 1', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: null }
  const testObj2 = { a: null }
  const testObj3 = { a: [{match: MATCH_VALUE.ALL_EQUAL}, { a: null }, { a: null }, { a: null }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value a is null in Obj1
test('Simple Null Test 2', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: null }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{match: MATCH_VALUE.ORIG_MATCH_A}, { a: null }, { a: null }, { a: 1 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value a is null in Obj2
test('Simple Null Test 3', (t) => {
  const testOrig = { a: 'hello' }
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: null }
  const testObj3 = { a: [{match: MATCH_VALUE.ORIG_MATCH_A}, { a: 'hello' }, { a: 'hello' }, { a: null }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for value a containing nested val vs number
//value a is null in Obj1
//missing b value in obj1 returns as null
test('Simple Null Test 4', (t) => {
  const testOrig = { a: null }
  const testObj1 = { a: null }
  const testObj2 = { a: { b: 3 } }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: null }, { a: null }, { a: { b: [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { b: 3 }] } }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for value in obj1 containing nested value vs null in obj2
//missing b value in obj 1 returns null
//null value in obj2 returns a: null
test('Simple Null Test 5', (t) => {
  const testOrig = { a: { b: 3 } }
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: null }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 3 }, { b: 3 }, null ]} },
                                           { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 3 }, { b: 3 }, null ]} },
                                           { a: null }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for nested value b containing null in Obj2
test('Simple Null Test 6', (t) => {
  const testOrig = { a: { b: 2 } }
  const testObj1 = { a: { b: 2 } }
  const testObj2 = { a: { b: null } }
  const testObj3 = { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 2 },
                                                { b: 2 },
                                                { b: null }] } }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for nested value b containing null in Obj1
test('Simple Null Test 7', (t) => {
  const testOrig = { a: { b: null } }
  const testObj1 = { a: { b: null } }
  const testObj2 = { a: { b: 2 } }
  const testObj3 = { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: null }, { b: null }, { b: 2}] } }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value containing null in Obj1, but missing in Obj2
test('Simple Null Test 8', (t) => {
  const testOrig = { test8: null }
  const testObj1 = { test8: null }
  const testObj2 = { }
  const testObj3 = { test8: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { test8: null }, { test8: null }, null] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value containing null in Obj1, but missing in Obj2
test('Simple Null Test 9', (t) => {
  const testOrig = { a: null, b: 123 }
  const testObj1 = { a: null, b: 123 }
  const testObj2 = { b: 123 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: null }, { a: null }, null ], b: [{ match: MATCH_VALUE.ALL_EQUAL }, { b: 123 }, { b: 123}, { b: 123 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing nested value containing null in Obj1, but missing in Obj2
test('Simple Null Test 10', (t) => {
  const testOrig = { a: { b: null } }
  const testObj1 = { a: { b: null } }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: null }, { b: null }, null ]}},
                                           { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: null }, { b: null }, null ]}},
                                           { a: 1 } ] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3);
})

//Testing value containing null in Obj2, but missing in Obj1
test('Simple Null Test 11', (t) => {
  const testOrig = { }
  const testObj1 = { }
  const testObj2 = { a: null }
  const testObj3 = { a: [ { match: MATCH_VALUE.ALL_DIFF }, null, null, { a: null }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value containing null in Obj2, but missing in Obj1
test('Simple Null Test 12', (t) => {
  const testOrig = { b: 123 }
  const testObj1 = { b: 123 }
  const testObj2 = { a: null, b: 123 }
  const testObj3 = { a: [ { match: MATCH_VALUE.ALL_DIFF }, null, null, { a: null }], b: [{ match: MATCH_VALUE.ALL_EQUAL }, { b: 123 }, { b: 123}, { b: 123 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//still need to code for this:
//Testing nested value containing null in Obj2, but missing in Obj1
//value b is null in Obj2
//missing b value in obj1 returns as null
test('Simple Null Test 13', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: { b: null } }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: { b: [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { b: null }] } }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing Nested values with inner most c containing mis-match.
test('Complex Test 1', (t) => {
  const testOrig = { a: { b: { c: 1 } } }
  const testObj1 = { a: { b: { c: 1 } } }
  const testObj2 = { a: { b: { c: 3 } } }
  const testObj3 = { a: { b: { c: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { c: 1 }, { c: 1 }, { c: 3 }] } } }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match of value a
//mis-match of nested values
test('Complex Test 2', (t) => {
  const testOrig = { a: 1, b: { a: 2 } }
  const testObj1 = { a: 1, b: { a: 2 } }
  const testObj2 = { a: 2, b: { a: 1 } }
  const testObj3 = {
    a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: 2 }],
    b: {
      a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 2 }, { a: 2 }, { a: 1 }],
    },
  }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing nested, Value c not located inside nested value -
//value c is missing from nested a in Obj2; returns null
//Value c is missing after a in Obj1; returns null
test('Complex Test 3', (t) => {
  const testOrig = { a: { b: 1, c: 2 } }
  const testObj1 = { a: { b: 1, c: 2 } }
  const testObj2 = { a: { b: 1 }, c: 3 }
  const testObj3 = {
    a: {
      b: [{ match: MATCH_VALUE.ALL_EQUAL }, { b: 1 }, { b: 1 }, { b: 1 }],
      c: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { c: 2 }, { c: 2 }, null],
    },
    c: [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { c: 3 }],
  }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for value a containing nested val vs number
//missing b value in obj2 returns as null
test('Nested Test 1', (t) => {
  const testOrig = { a: { b: 3 } }
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 3 }, { b: 3 }, null] } },
                                           { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 3 }, { b: 3 }, null] } },
                                           { a: 1 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for value a containing nest val vs number
//missing b value in obj1 returns as null
test('Nested Test 2', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: { b: 3 } }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: { b: [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { b: 3 }] } }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing nested equal match
test('Nested Test 3', (t) => {
  const testOrig = { a: { b: 3 } }
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: { b: 3 } }
  const testObj3 = { a: { b: [{ match: MATCH_VALUE.ALL_EQUAL }, { b: 3 }, { b: 3 }, { b: 3 }] } }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mis-match of value b inside nested
test('Nested Test 4', (t) => {
  const testOrig = { a: { b: 3 } }
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: { b: 4 } }
  const testObj3 = { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 3 }, { b: 3 }, { b: 4 }] } }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mis-match for value a containing deep nested val
test('Deep nested Test 1', (t) => {
  const testOrig = { a: { b: { c: { d: { e : 5 }}} } }
  const testObj1 = { a: { b: 3 } }
  const testObj2 = { a: 1 }
  const testObj3 = {"a":[{"match":"allDiff"},
                         {"a":{"b":[{"match":"allDiff"},
                                    {"b":{"c":[{"match":"allDiff"},
                                               {"c":{"d":[{"match":"allDiff"},
                                                          {"d":{"e":[{"match":"allDiff"},
                                                                     {"e":5},
                                                                     null,
                                                                     null]}},
                                                           null,
                                                           null]}},
                                                null,
                                                null]}},
                                    {"b":3},
                                    null]}},
                         {"a":{"b":[{"match":"allDiff"},
                                    {"b":{"c":[{"match":"allDiff"},
                                               {"c":{"d":[{"match":"allDiff"},
                                                          {"d":{"e":[{"match":"allDiff"},
                                                                     {"e":5},
                                                                     null,
                                                                     null]}},
                                                           null,
                                                           null]}},
                                                null,
                                                null]}},
                                    {"b":3},
                                    null]}},
                         {"a":1}]}






  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  console.debug("Deep nested: " + JSON.stringify(result));
  t.deepEqual(result, testObj3)
})

//Testing empty json returns empty json
test('Edge Test 1', (t) => {
  const testOrig = { }
  const testObj1 = { }
  const testObj2 = { }
  const testObj3 = { }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple value match
test('Edge Test 2', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 }, { a: 1 }, { a: 1 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple value match
test('Edge Test 4', (t) => {
  const testOrig = { a: 1, b: 2 }
  const testObj1 = { a: 1, b: 2 }
  const testObj2 = { a: 1, b: 2 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 1 }, { a: 1 }, { a: 1 }], b: [{ match: MATCH_VALUE.ALL_EQUAL }, { b: 2 }, { b: 2 }, { b: 2 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value mismatch
test('String Test 1', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: 'hello' }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple value match
test('String Test 2', (t) => {
  const testOrig = { a: 'hello' }
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 'hello' }, { a: 'hello' }, { a: 'hello' }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value mis-match of value a containing array vs simple value
test('String Test 3', (t) => {
  const testOrig = { a: ['hello', 'goodbye'] }
  const testObj1 = { a: ['hello', 'goodbye'] }
  const testObj2 = { a: 5 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: ['hello', 'goodbye'] }, { a: ['hello', 'goodbye'] }, { a: 5 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mismatch
test('String Test 4', (t) => {
  const testOrig = { a: 'hello' }
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: 1 }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 'hello' }, { a: 'hello' }, { a: 1 }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mismatch
test('String Test 5', (t) => {
  const testOrig = { a: 'hello' }
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: 'goodbye' }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 'hello' }, { a: 'hello' }, { a: 'goodbye' }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing mismatch of value a containing array vs simple string value
test('String Test 6', (t) => {
  const testOrig = { a: 'hello' }
  const testObj1 = { a: 'hello' }
  const testObj2 = { a: [5, 'goodbye'] }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 'hello' }, { a: 'hello' }, { a: [5, 'goodbye'] }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing value a containing string vs nested value b containing string
//missing value b in Obj2 returns null
test('String Test 7', (t) => {
  const testOrig = { a: { b: 'hello' } }
  const testObj1 = { a: { b: 'hello' } }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 'hello' }, { b: 'hello' }, null] } },
                                           { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 'hello' }, { b: 'hello' }, null] } },
                                           { a: 'hello' }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mismatch value a number vs string
test('String Test 8', (t) => {
  const testOrig = { a: 1 }
  const testObj1 = { a: 1 }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 1 }, { a: 1 }, { a: 'hello' }] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing simple mismatch nested strings
test('String Test 9', (t) => {
  const testOrig = { a: { b: 'hello' } }
  const testObj1 = { a: { b: 'hello' } }
  const testObj2 = { a: { b: 'goodbye' } }
  const testObj3 = { a: { b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 'hello' }, { b: 'hello' }, { b: 'goodbye' }] } }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value b in Obj2 returns null
test('String Test 10', (t) => {
  const testOrig = { a: 'hello', b: 'goodbye' }
  const testObj1 = { a: 'hello', b: 'goodbye' }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 'hello' }, { a: 'hello' }, { a: 'hello' }],
                     b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 'goodbye' }, { b: 'goodbye' }, null] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing value b in Obj2 returns null (duplicate test)
test('String Test 11', (t) => {
  const testOrig = { a: 'hello', b: 'goodbye' }
  const testObj1 = { a: 'hello', b: 'goodbye' }
  const testObj2 = { a: 'hello' }
  const testObj3 = { a: [{ match: MATCH_VALUE.ALL_EQUAL }, { a: 'hello' }, { a: 'hello' }, { a: 'hello' }],
                     b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 'goodbye' }, { b: 'goodbye' }, null] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing string value a in Obj2  returns null
test('String Test 12', (t) => {
  const testOrig = { a: 'hello' }
  const testObj1 = { a: 'hello' }
  const testObj2 = { }
  const testObj3 = { a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 'hello' }, { a: 'hello' }, null] }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

//Testing missing string values a-d in Obj2, returns null for each
test('String Test 13', (t) => {
  const testOrig = { a: 'hello', b: 'goodbye', c: 'apple', d: 'pear'}
  const testObj1 = { a: 'hello', b: 'goodbye', c: 'apple', d: 'pear'}
  const testObj2 = {}
  const testObj3 = {
    a: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { a: 'hello' }, { a: 'hello' }, null],
    b: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { b: 'goodbye' }, { b: 'goodbye' }, null],
    c: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { c: 'apple' }, { c: 'apple' }, null],
    d: [{ match: MATCH_VALUE.ORIG_MATCH_A }, { d: 'pear' }, { d: 'pear' }, null],
  }
  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Match With Array Test 1', (t) => {
  const testOrig = { a: { b: 2, c: 3 }, j: [10, 9, 8] }
  const testObj1 = { a: { b: 2, c: 3 }, j: [10, 9, 8] }
  const testObj2 = { a: { b: 2, c: 3 }, j: [10, 9, 8] }

  const testObj3 = { a: { b: [{ match: MATCH_VALUE.ALL_EQUAL }, { b: 2 }, { b: 2 }, { b:2 }],
                          c: [{ match: MATCH_VALUE.ALL_EQUAL }, { c: 3 }, { c: 3 }, { c: 3 }]},
                     j: [{ match: MATCH_VALUE.ALL_EQUAL }, { j: [ 10, 9, 8 ]}, { j: [ 10, 9, 8 ]}, { j: [ 10, 9, 8 ]}]}

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Mixed Doc 1 - A', (t) => {
  const testOrig = {
                     a: {
                       a: {
                         a: {
                           a: {
                             a: 1,
                             b: undefined,
                             c: false,
                             d: true,
                             e: 5,
                             k: null,
                             y: 1,
                             z: { a: 1, b: 2, c: 3, d: 4 },
                           },
                         },
                         j: [10, 9, 8],
                       },
                     },
                     h: {
                       i: false,
                       m: true,
                     },
                   }
  const testObj1 = {
                     a: {
                       a: {
                         a: {
                           a: {
                             a: 1,
                             b: undefined,
                             c: false,
                             c2: 1,
                             d: true,
                             e: 5,
                             k: null,
                             y: [1, 2],
                             z: 1,
                           },
                         },
                         j: [10, 9, 8],
                       },
                     },
                     h: {
                       i: false,
                       m: true,
                     },
                   }
  const testObj2 = {
                    a: {
                      a: {
                        a: {
                          a: {
                            a: 1,
                            b: undefined,
                            c: false,
                            c2: 1,
                            d: true,
                            e: 5,
                            k: null,
                            y: [1, 2],
                            z: 1,
                          },
                        },
                        j: [10, 9, 8],
                      },
                    },
                    h: {
                      i: false,
                      m: true,
                    },
                  }

  const testObj3 = {"a":
                     {"a":
                       {"a":
                         {"a":
                           {"a":[{"match":MATCH_VALUE.ALL_EQUAL},{"a":1},{"a":1},{"a":1}],
                            "b":[{"match":MATCH_VALUE.ALL_EQUAL},{"b":undefined},{"b":undefined},{"b":undefined}],
                            "c":[{"match":MATCH_VALUE.ALL_EQUAL},{"c":false},{"c":false},{"c":false}],
                            "c2":[{"match":MATCH_VALUE.ALL_DIFF},null,{"c2":1},{"c2":1}],
                            "d":[{"match":MATCH_VALUE.ALL_EQUAL},{"d":true},{"d":true},{"d":true}],
                            "e":[{"match":MATCH_VALUE.ALL_EQUAL},{"e":5},{"e":5},{"e":5}],
                            "k":[{"match":MATCH_VALUE.ALL_EQUAL},{"k":null},{"k":null},{"k":null}],
                            "y":[{"match":MATCH_VALUE.MODS_MATCH},{"y":1},{"y":[1,2]},{"y":[1,2]}],
                            "z":[{"match":MATCH_VALUE.MODS_MATCH},{"z":
                                                       {"a":[{"match":MATCH_VALUE.ALL_DIFF},{"a":1},null,null],
                                                        "b":[{"match":MATCH_VALUE.ALL_DIFF},{"b":2},null,null],
                                                        "c":[{"match":MATCH_VALUE.ALL_DIFF},{"c":3},null,null],
                                                        "d":[{"match":MATCH_VALUE.ALL_DIFF},{"d":4},null,null]}},
                                                     {"z":1},
                                                     {"z":1}]
                            }
                         },
                          "j":[{"match":MATCH_VALUE.ALL_EQUAL},{"j":[10,9,8]},{"j":[10,9,8]},{"j":[10,9,8]}]
                       }
                     },
                     "h":{"i":[{"match":MATCH_VALUE.ALL_EQUAL},{"i":false},{"i":false},{"i":false}],
                          "m":[{"match":MATCH_VALUE.ALL_EQUAL},{"m":true},{"m":true},{"m":true}]
                         }
                   }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})

test('Mixed Doc 1 - B', (t) => {
  const testOrig = {
                     a: {
                       a: {
                         a: {
                           a: {
                             a: 1,
                             b: undefined,
                             c: false,
                             d: true,
                             e: 5,
                             k: null,
                             y: 1,
                             z: { a: 1, b: 2, c: 3, d: 4 },
                           },
                         },
                         j: [10, 9, 8],
                       },
                     },
                     h: {
                       i: false,
                       m: true,
                     },
                   }
  const testObj1 = {
                     a: {
                       a: {
                         a: {
                           a: {
                             a: true,
                             c: false,
                             d: {
                               e: [1, 2, 3],
                               f: [4, 5, 6],
                               g: [7, 8, 9],
                             },
                             e: 5,
                             k: 123,
                           },
                         },
                         j: [10, 9, 8],
                       },
                     },
                   }
  const testObj2 = {
                     a: {
                       a: {
                         a: {
                           a: {
                             a: true,
                             c: false,
                             d: {
                               e: [1, 2, 3],
                               f: [4, 5, 6],
                               g: [7, 8, 9],
                             },
                             e: 5,
                             k: 123,
                           },
                         },
                         j: [10, 9, 8],
                       },
                     },
                   }

  const testObj3 = {"a":
                     {"a":
                       {"a":
                         {"a":
                           {"a":[{"match":MATCH_VALUE.MODS_MATCH},{"a":1},{"a":true},{"a":true}],
                            "b":[{"match":MATCH_VALUE.ALL_DIFF},{"b":undefined},null,null],
                            "c":[{"match":MATCH_VALUE.ALL_EQUAL},{"c":false},{"c":false},{"c":false}],
                            "d":[{"match":MATCH_VALUE.MODS_MATCH},{"d":true},{"d":
                                                                  {"e":[{"match":MATCH_VALUE.MODS_MATCH},null,{"e":[1,2,3]},{"e":[1,2,3]}],
                                                                   "f":[{"match":MATCH_VALUE.MODS_MATCH},null,{"f":[4,5,6]},{"f":[4,5,6]}],
                                                                   "g":[{"match":MATCH_VALUE.MODS_MATCH},null,{"g":[7,8,9]},{"g":[7,8,9]}]
                                                                  }
                                                                },
                                                                {"d":
                                                                  {"e":[{"match":MATCH_VALUE.MODS_MATCH},null,{"e":[1,2,3]},{"e":[1,2,3]}],
                                                                   "f":[{"match":MATCH_VALUE.MODS_MATCH},null,{"f":[4,5,6]},{"f":[4,5,6]}],
                                                                   "g":[{"match":MATCH_VALUE.MODS_MATCH},null,{"g":[7,8,9]},{"g":[7,8,9]}]
                                                                  }
                                                                }
                                 ],
                            "e":[{"match":MATCH_VALUE.ALL_EQUAL},{"e":5},{"e":5},{"e":5}],
                            "k":[{"match":MATCH_VALUE.MODS_MATCH},{"k":null},{"k":123},{"k":123}],
                            "y":[{"match":MATCH_VALUE.ALL_DIFF},{"y":1},null,null],
                            "z":[{"match":MATCH_VALUE.ALL_DIFF},{"z":
                                                       {"a":[{"match":MATCH_VALUE.ALL_DIFF},{"a":1},null,null],
                                                        "b":[{"match":MATCH_VALUE.ALL_DIFF},{"b":2},null,null],
                                                        "c":[{"match":MATCH_VALUE.ALL_DIFF},{"c":3},null,null],
                                                        "d":[{"match":MATCH_VALUE.ALL_DIFF},{"d":4},null,null]}
                                                     },
                                                     null, null]
                            }
                         },
                         "j":[{"match":MATCH_VALUE.ALL_EQUAL},{"j":[10,9,8]},{"j":[10,9,8]},{"j":[10,9,8]}]
                       }
                     },
                     "h":[{"match":MATCH_VALUE.ALL_DIFF},{"h":
                                                {"i":[{"match":MATCH_VALUE.ALL_DIFF},{"i":false},null,null],
                                                 "m":[{"match":MATCH_VALUE.ALL_DIFF},{"m":true},null,null]
                                                }
                                              },
                                          null, null]
                   }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})


test('Mixed Doc 1 - AB', (t) => {
const testOrig = {
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          d: true,
          e: 5,
          k: null,
          y: 1,
          z: { a: 1, b: 2, c: 3, d: 4 },
        },
      },
      j: [10, 9, 8],
    },
  },
  h: {
    i: false,
    m: true,
  },
}

const testObj1 = {
  a: {
    a: {
      a: {
        a: {
          a: true,
          c: false,
          d: {
            e: [1, 2, 3],
            f: [4, 5, 6],
            g: [7, 8, 9],
          },
          e: 5,
          k: 123,
        },
      },
      j: [10, 9, 8],
    },
  },
}


const testObj2 = {
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          c2: 1,
          d: true,
          e: 5,
          k: null,
          y: [1, 2],
          z: 1,
        },
      },
      j: [10, 9, 8],
    },
  },
  h: {
    i: false,
    m: true,
  },
}


  const testObj3 = {"a":
                     {"a":
                       {"a":
                         {"a":
                           {"a":[{"match":MATCH_VALUE.ORIG_MATCH_B},{"a":1},{"a":true},{"a":1}],
                            "b":[{"match":MATCH_VALUE.ORIG_MATCH_B},{"b":undefined},null,{"b":undefined}],
                            "c":[{"match":MATCH_VALUE.ALL_EQUAL},{"c":false},{"c":false},{"c":false}],
                            "c2":[{"match":MATCH_VALUE.ALL_DIFF},null,null,{"c2":1}],
                            "d":[{"match":MATCH_VALUE.ORIG_MATCH_B},{"d":true},{"d":
                                                                  {"e":[{"match":MATCH_VALUE.ALL_DIFF},null,{"e":[1,2,3]},null],
                                                                   "f":[{"match":MATCH_VALUE.ALL_DIFF},null,{"f":[4,5,6]},null],
                                                                   "g":[{"match":MATCH_VALUE.ALL_DIFF},null,{"g":[7,8,9]},null]
                                                                  }
                                                                },
                                                                {"d":true}
                                 ],
                            "e":[{"match":MATCH_VALUE.ALL_EQUAL},{"e":5},{"e":5},{"e":5}],
                            "k":[{"match":MATCH_VALUE.ORIG_MATCH_B},{"k":null},{"k":123},{"k":null}],
                            "y":[{"match":MATCH_VALUE.ALL_DIFF},{"y":1},null,{"y":[1,2]}],
                            "z":[{"match":MATCH_VALUE.ALL_DIFF},{"z":
                                                       {"a":[{"match":MATCH_VALUE.ALL_DIFF},{"a":1},null,null],
                                                        "b":[{"match":MATCH_VALUE.ALL_DIFF},{"b":2},null,null],
                                                        "c":[{"match":MATCH_VALUE.ALL_DIFF},{"c":3},null,null],
                                                        "d":[{"match":MATCH_VALUE.ALL_DIFF},{"d":4},null,null]}
                                                     },
                                                     null, {"z":1}]
                            }
                         },
                         "j":[{"match":MATCH_VALUE.ALL_EQUAL},{"j":[10,9,8]},{"j":[10,9,8]},{"j":[10,9,8]}]
                       }
                     },
                     "h":[{"match":MATCH_VALUE.ORIG_MATCH_B},{"h":
                                                {"i":[{"match":MATCH_VALUE.ORIG_MATCH_B},{"i":false},null,{"i":false}],
                                                 "m":[{"match":MATCH_VALUE.ORIG_MATCH_B},{"m":true},null,{"m":true}]
                                                }
                                              },
                                          null, {"h":
                                                  {"i":[{"match":MATCH_VALUE.ORIG_MATCH_B},{"i":false},null,{"i":false}],
                                                   "m":[{"match":MATCH_VALUE.ORIG_MATCH_B},{"m":true},null,{"m":true}]
                                                  }
                                                }]
                   }

  const result = tripleDiffer.compareTripleJSON(testOrig, testObj1, testObj2)
  t.deepEqual(result, testObj3)
})
