/**
* @name tripleDiffer.js
* @author Marita Carballo
* @description Compares all elements of three JSON files and outputs the
* diffed document after
*/

/*
 * compareTripleJSON is a diffing function that was written by the developers that
 * had a consistent, specific output. The outputs will be a document that contains
 * key value pairs, where the value will either be an object (if there is nesting) or an
 * array containing a match tag indicating if the following values equal or not, in addition to the
 * the values (as objects) found at the key value pair from each doc.
 * examples:
 * orig = {a:1} docA = {a:1} docB = {a:2}           compareTripleJSON output: {a: [{match: origMatchA}, {a:1}, {a:1}, {a:2}]}
 * orig = {a:3} docA = {a:3} docB = {a:3}           compareTripleJSON output: {a: [{match: allEqual}, {a:3}, {a:3}, {a:3}]}
 * orig = {a:3} docA = {a:3} docB = {b:3}           compareTripleJSON output: {a: [{match: origMatchA}, {a:3}, {a:3}, null], b: [{match: origMatchA}, null, null,{b:3}]}
 */
var constants = require("./constants.js");
const MATCH_VALUE = constants.MATCH_VALUE;

function compareTripleJSON(orig, obj1, obj2) {
  let ret = {}
  const arrOrig = Object.keys(orig)
  const arr1 = Object.keys(obj1)
  const arr2 = Object.keys(obj2)

  arrOrig.forEach((key) => {
    // if this key is found in all 3 documents
    if (orig.hasOwnProperty(key) && obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      console.debug("All 3 docs have key = " + key + " orig[key] = " + orig[key] + " obj1[key] = " + obj1[key] + " obj2[key] = " + obj2[key]);
      //if just one of the values for that key is an array
      if ((orig[key] instanceof Array) || (obj1[key] instanceof Array) || (obj2[key] instanceof Array)) {
        console.debug("All 3 have key - ONE key is array");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: orig[key] }, { [key]: obj1[key] }, { [key]: obj2[key] }]
      }
      //if all 3 values for that key are null
      else if (orig[key] === null && obj1[key] === null && obj2[key] === null) {
        console.debug("all 3 values are null.  Trying to return true here")
        ret[key] = [{match: tripleMatch(orig[key], obj1[key], obj2[key])}, { [key]: null }, { [key]: null }, { [key]: null }]
      }
      //if 2 values for that key are null, and 1 is an object
      else if (orig[key] === null && obj1[key] === null && typeof obj2[key] === 'object') {
      console.debug("2 null, 1 object, first if");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: null }, { [key]: null }, { [key]: compareTripleJSON({}, {}, obj2[key]) }]
      }
      else if (orig[key] === null && typeof obj1[key] === 'object' && obj2[key] === null) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: null }, { [key]: compareTripleJSON( {}, obj1[key], {} ) }, { [key]: null }]
      }
      else if (typeof orig[key] === 'object' && obj1[key] === null && obj2[key] === null) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: compareTripleJSON( orig[key], {}, {} )}, { [key]: null }, { [key]: null }]
      }
      //if 2 values for that key are objects, and 1 is null
      else if (typeof orig[key] === 'object' && typeof obj1[key] === 'object' && obj2[key] === null) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: compareTripleJSON( orig[key], obj1[key], {} )},
                    { [key]: compareTripleJSON( orig[key], obj1[key], {} )},
                    { [key]: null }]
      }
      else if (typeof orig[key] === 'object' && obj1[key] === null && typeof obj2[key] === 'object') {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: compareTripleJSON( orig[key], {}, obj2[key] )},
                    { [key]: null },
                    { [key]: compareTripleJSON( orig[key], {}, obj2[key] )}]
      }
      else if (orig[key] === null && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: null },
                    { [key]: compareTripleJSON( {}, obj1[key], obj2[key] )},
                    { [key]: compareTripleJSON( {}, obj1[key], obj2[key] )}]
      }
      //if 2 values for that key are null, and 1 is not an object
      else if (orig[key] === null && obj1[key] === null && !(typeof obj2[key] === 'object')) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: null }, { [key]: null }, { [key]: obj2[key] }]
      }
      else if (orig[key] === null && !(typeof obj1[key] === 'object') && obj2[key] === null) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: null }, { [key]: obj1[key] }, { [key]: null }]
      }
      else if (!(typeof orig[key] === 'object') && obj1[key] === null && obj2[key] === null) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: orig[key] }, { [key]: null }, { [key]: null }]
      }
      //if 2 values for that key are not objects, and 1 is null
      else if (!(typeof orig[key] === 'object') && !(typeof obj1[key] === 'object') && obj2[key] === null) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: orig[key] }, { [key]: obj1[key] }, { [key]: null }]
      }
      else if (!(typeof orig[key] === 'object') && obj1[key] === null && !(typeof obj2[key] === 'object')) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: orig[key] }, { [key]: null }, { [key]: obj2[key] }]
      }
      else if (orig[key] === null && !(typeof obj1[key] === 'object') && !(typeof obj2[key] === 'object')) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) }, { [key]: null }, { [key]: obj1[key] }, { [key]: obj2[key] }]
      }
      //if 1 value is null, 1 is an object, and 1 is not an object - 6 checks
      else if (orig[key] === null && typeof obj1[key] === 'object' && !(typeof obj2[key] === 'object')) {
        console.debug("one of each check 1");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: null },
                    { [key]: compareTripleJSON( {}, obj1[key], {} )},
                    { [key]: obj2[key] }]
      }
      else if (orig[key] === null && !(typeof obj1[key] === 'object') && typeof obj2[key] === 'object') {
        console.debug("one of each check 2");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: null },
                    { [key]: obj1[key]},
                    { [key]: compareTripleJSON( {}, {}, obj2[key] ) }]
      }
      else if (!(typeof orig[key] === 'object') && obj1[key] === null && typeof obj2[key] === 'object') {
        console.debug("one of each check 3");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: orig[key] },
                    { [key]: null },
                    { [key]: compareTripleJSON( {}, {}, obj2[key] ) }]
      }
      else if (typeof orig[key] === 'object' && obj1[key] === null && !(typeof obj2[key] === 'object')) {
        console.debug("one of each check 4");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: compareTripleJSON( orig[key], {}, {} ) },
                    { [key]: null },
                    { [key]: obj2[key] }]
      }
      else if (typeof orig[key] === 'object' && !(typeof obj1[key] === 'object') && obj2[key] === null) {
        console.debug("one of each check 5");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: compareTripleJSON( orig[key], {}, {} ) },
                    { [key]: obj1[key] },
                    { [key]: null }]
      }
      else if (!(typeof orig[key] === 'object') && typeof obj1[key] === 'object' && obj2[key] === null) {
        console.debug("one of each check 6");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: orig[key] },
                    { [key]: compareTripleJSON( {}, obj1[key], {} ) },
                    { [key]: null }]
      }

      //if all 3 values are objects
      else if (typeof orig[key] === 'object' && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        ret[key] = compareTripleJSON(orig[key], obj1[key], obj2[key])
      }
      //if 2 values are objects, and 1 is not an object
      else if (typeof orig[key] === 'object' && typeof obj1[key] === 'object' && !(typeof obj2[key] === 'object')) {
        console.debug("2 objects 1 not object check 1");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: compareTripleJSON( orig[key], obj1[key], {} ) },
                    { [key]: compareTripleJSON( orig[key], obj1[key], {} ) },
                    { [key]: obj2[key] }]
      }
      else if (typeof orig[key] === 'object' && !(typeof obj1[key] === 'object') && typeof obj2[key] === 'object') {
        console.debug("2 objects 1 not object check 2");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: compareTripleJSON( orig[key], {}, obj2[key] ) },
                    { [key]: obj1[key] },
                    { [key]: compareTripleJSON( orig[key], {}, obj2[key] ) }]
      }
      else if (!(typeof orig[key] === 'object') && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        console.debug("2 objects 1 not object check 3");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: orig[key] },
                    { [key]: compareTripleJSON( {}, obj1[key], obj2[key] )},
                    { [key]: compareTripleJSON( {}, obj1[key], obj2[key] )}]
      }
      //if 1 values is an object, and 2 are not objects
      else if (!(typeof orig[key] === 'object') && !(typeof obj1[key] === 'object') && typeof obj2[key] === 'object') {
        console.debug("1 object 2 not object check 1");

        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: orig[key] },
                    { [key]: obj1[key] },
                    { [key]: compareTripleJSON( {}, {}, obj2[key] )}]
      }
      else if (!(typeof orig[key] === 'object') && typeof obj1[key] === 'object' && !(typeof obj2[key] === 'object')) {
        console.debug("1 object 2 not object check 2");

        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: orig[key] },
                    { [key]: compareTripleJSON( {}, obj1[key], {} )},
                    { [key]: obj2[key] }]
      }
      else if (typeof orig[key] === 'object' && !(typeof obj1[key] === 'object') && !(typeof obj2[key] === 'object')) {
        console.debug("1 object 2 not object check 3");
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: compareTripleJSON( orig[key], {}, {} ) },
                    { [key]: obj1[key] },
                    { [key]: obj2[key] }]
      }
      else {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], obj2[key]) },
                    { [key]: orig[key] },
                    { [key]: obj1[key] },
                    { [key]: obj2[key] }]
      }
    }

    // if this key is only found in original document
    if (orig.hasOwnProperty(key) && (!obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key))) {

      console.debug("ORIG has key = " + key + " obj1[key] = " + obj1[key] + "obj2[key] = " + obj2[key]);
      //it is an array
      if (orig[key] instanceof Array) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: orig[key] }, null, null]
      }
      //it is a not null object
      else if (typeof orig[key] === 'object' && orig[key] !== null) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: compareTripleJSON(orig[key], {}, {}) }, null, null]
      }
      //it is null
      else if (orig[key] === null) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: null }, null, null]
      }
      else {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: orig[key] }, null, null]
      }
    }

    // if this key is found in original and obj1 documents, but not obj2
    if (orig.hasOwnProperty(key) && obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {

      console.debug("ORIG has key = " + key + " obj1[key] = " + obj1[key] + "obj2[key] = " + obj2[key]);
      //one is array
      if (orig[key] instanceof Array || obj1[key] instanceof Array) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], null) }, { [key]: orig[key] }, { [key]: obj1[key] }, null]
      }
      //both are null
      else if (orig[key] === null && obj1[key] === null) {
        ret[key] = [{ match: 'origMatchA' }, { [key]: null }, { [key]: null }, null]
      }
      //one is null and other is object
      else if (orig[key] === null && typeof obj1[key] === 'object') {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: null }, { [key]: compareTripleJSON({}, obj1[key], {}) }, null]
      }
      else if (typeof orig[key] === 'object' && obj1[key] === null) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: compareTripleJSON( orig[key], {}, {}) }, { [key]: null }, null]
      }
      //one is null and other is not object
      else if (orig[key] === null && !(typeof obj1[key] === 'object')) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: null }, { [key]: obj1[key] }, null ]
      }
      else if (!(typeof orig[key] === 'object') && obj1[key] === null) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: orig[key] }, { [key]: null }, null ]
      }
      //both are not null objects
      else if (typeof orig[key] === 'object' && orig[key] !== null && typeof obj1[key] === 'object' && obj1[key] !== null) {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], null) }, { [key]: compareTripleJSON(orig[key], obj1[key], {}) }, { [key]: compareTripleJSON(orig[key], obj1[key], {}) }, null]
      }
      //one is object and other is not an object
      else if (typeof orig[key] === 'object' && !(typeof obj1[key] === 'object')) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: compareTripleJSON( orig[key], {}, {}) }, { [key]: obj1[key] }, null ]
      }
      else if (!(typeof orig[key] === 'object') && typeof obj1[key] === 'object') {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: orig[key] }, { [key]: compareTripleJSON( {}, obj1[key], {}) }, null ]
      }
      else {
        ret[key] = [{ match: tripleMatch(orig[key], obj1[key], null) }, { [key]: orig[key] }, { [key]: obj1[key] }, null]
      }
    }


    // if this key is found in original and obj2 documents, but not obj1
    if (orig.hasOwnProperty(key) && !obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {

      console.debug("ORIG has key = " + key + " obj1[key] = " + obj1[key] + "obj2[key] = " + obj2[key]);
      //one is array
      if (orig[key] instanceof Array || obj2[key] instanceof Array) {
        ret[key] = [{ match: tripleMatch(orig[key], null, obj2[key] ) }, { [key]: orig[key] }, null, { [key]: obj2[key] } ]
      }
      //both are null
      else if (orig[key] === null && obj2[key] === null) {
        ret[key] = [{ match: 'origMatchB' }, { [key]: null }, null, { [key]: null }]
      }
      //one is null and other is object
      else if (orig[key] === null && typeof obj2[key] === 'object') {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: null }, null, { [key]: compareTripleJSON({}, {}, obj2[key]) } ]
      }
      else if (typeof orig[key] === 'object' && obj2[key] === null) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: compareTripleJSON( orig[key], {}, {}) }, null, { [key]: null } ]
      }
      //one is null and other is not object
      else if (orig[key] === null && !(typeof obj2[key] === 'object')) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: null }, null, { [key]: obj2[key] } ]
      }
      else if (!(typeof orig[key] === 'object') && obj2[key] === null) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: orig[key] }, null, { [key]: null } ]
      }
      //both are not null objects
      else if (typeof orig[key] === 'object' && orig[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
        ret[key] = [{ match: tripleMatch(orig[key], null, obj2[key] ) }, { [key]: compareTripleJSON(orig[key], {}, obj2[key]) }, null, { [key]: compareTripleJSON( orig[key], {}, obj2[key]) }]
      }
      //one is object and other is not an object
      else if (typeof orig[key] === 'object' && !(typeof obj2[key] === 'object')) {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: compareTripleJSON( orig[key], {}, {}) }, null, { [key]: obj2[key] } ]
      }
      else if (!(typeof orig[key] === 'object') && typeof obj2[key] === 'object') {
        ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, { [key]: orig[key] }, null, { [key]: compareTripleJSON( {}, {}, obj2[key]) } ]
      }
      else {
        ret[key] = [{ match: tripleMatch(orig[key], null, obj2[key] ) }, { [key]: orig[key] }, null, { [key]: obj2[key] }]
      }
    }


  })

  // if there is a key in document1 that is not in the original document it will
  // be found here
  arr1.forEach((key) => {
    if (obj1.hasOwnProperty(key) && !ret.hasOwnProperty(key)) {
      console.debug("DOC1 has key = " + key + " obj1[key] = " + obj1[key]);
      //does obj2 also have the key? (obj1 and ob2 have the key, but not orig)
      if (obj2.hasOwnProperty(key)) {
        //one is array
        if (obj1[key] instanceof Array || obj2[key] instanceof Array) {
          ret[key] = [{ match: tripleMatch(null, obj1[key], obj2[key]) }, null, { [key]: obj1[key] }, { [key]: obj2[key] } ]
        }
        //both are null
        else if (obj1[key] === null && obj2[key] === null) {
          ret[key] = [{ match: 'modsMatch' }, null, { [key]: null }, { [key]: null }]
        }
        //one is null and other is object
        else if (obj1[key] === null && typeof obj2[key] === 'object') {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: null }, { [key]: compareTripleJSON({}, {}, obj2[key]) } ]
        }
        else if (typeof obj1[key] === 'object' && obj2[key] === null) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: compareTripleJSON( {}, obj1[key], {}) }, { [key]: null }]
        }
        //one is null and other is not object
        else if (obj1[key] === null && !(typeof obj2[key] === 'object')) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: null }, { [key]: obj2[key] } ]
        }
        else if (!(typeof obj1[key] === 'object') && obj2[key] === null) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: obj1[key] }, { [key]: null } ]
        }
        //both are not null objects
        else if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
          ret[key] = [{ match: tripleMatch(null, obj1[key], obj2[key]) }, null, { [key]: compareTripleJSON({}, obj1[key], obj2[key]) }, { [key]: compareTripleJSON({}, obj1[key], obj2[key]) }]
        }
        //one is object and other is not an object
        else if (typeof obj1[key] === 'object' && !(typeof obj2[key] === 'object')) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: compareTripleJSON( {}, obj1[key], {}) }, { [key]: obj2[key] } ]
        }
        else if (!(typeof obj1[key] === 'object') && typeof obj2[key] === 'object') {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: obj1[key] }, { [key]: compareTripleJSON( {}, {}, obj2[key]) } ]
        }
        else {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: obj1[key] }, { [key]: obj2[key] }]
        }

      }
      //key found in only obj1
      else {
        //if the key is an array
        if (obj1[key] instanceof Array) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: obj1[key] }, null]
        }
        //if its an object and notnull
        else if (typeof obj1[key] === 'object' && obj1[key] != null) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]:compareTripleJSON({}, obj1[key], {}) }, null]
        }
        //if its null
        else if (obj1[key] === null) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: null }, null]
        }
        else {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, { [key]: obj1[key] }, null]
        }
      }
    }
  })

  // if there is a key in document 2 that is not in the original document it will
  // be found here
  //If we've gotten this far, we can be assured that document 1 does not have the key

  arr2.forEach((key) => {
    if (obj2.hasOwnProperty(key) && !ret.hasOwnProperty(key)) {
        //if the key is an array
        if (obj2[key] instanceof Array) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { [key]: obj2[key] }]
        }
        //if its an object and not null
        else if (typeof obj2[key] === 'object' && obj2[key] != null) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { [key]:compareTripleJSON({}, {}, obj2[key]) }]
        }
        //if it's null
        else if (obj2[key] === null) {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { [key]: null }]
        }
        else {
          ret[key] = [{ match: MATCH_VALUE.ALL_DIFF }, null, null, { [key]: obj2[key] }]
        }
    }

  })
  console.debug("Returning" + ret);
  console.debug(Object.keys(ret).toString());
  return sortByKey(ret);

}


//Match function returning 5 separate values whether or not the key values match.
//allEqual indicates that all 3 docs have the same key value
//allDiff indicates that all 3 docs have different key values.  Also, if the orig value is null, this will return allDiff.
//origMatchA indicates that the key Value in the orig and docA matches, but docB contains a different value.
//origMatchB indicates that the key value in the orig and docB matches, but docA contains a different value.
//modsMatch indicates that the key value in docA and docB matches, but original contains a different value.
function tripleMatch(x, y, z) {
    if (JSON.stringify(x) === JSON.stringify(y) && JSON.stringify(y) === JSON.stringify(z)) {
      return MATCH_VALUE.ALL_EQUAL;
    } else if (JSON.stringify(x) !== JSON.stringify(y) &&
               JSON.stringify(y) !== JSON.stringify(z) &&
               JSON.stringify(x) !== JSON.stringify(z)) {
      return MATCH_VALUE.ALL_DIFF;
    } else if (JSON.stringify(x) === JSON.stringify(y) && JSON.stringify(y) !== JSON.stringify(z)) {
      return MATCH_VALUE.ORIG_MATCH_A;
    } else if (JSON.stringify(x) === JSON.stringify(z) && JSON.stringify(x) !== JSON.stringify(y)) {
      return MATCH_VALUE.ORIG_MATCH_B;
    } else if (JSON.stringify(y) === JSON.stringify(z) && JSON.stringify(y) !== JSON.stringify(x)) {
      return MATCH_VALUE.MODS_MATCH;
    }
    return MATCH_VALUE.ALL_DIFF;

}

function sortByKey(ret) {
    let sortedRet = {};
    let keys = Object.keys(ret);
    if (keys.length > 1) {
        keys = keys.sort()
        for (let i in keys) {
            let key = keys[i];

            sortedRet[key] = ret[key];
        }
        return sortedRet;
    }
    else return ret;
}

console.debug = function(message) {
  if (!console.debugging) return;
  console.log(message);
};

module.exports = {
  compareTripleJSON: compareTripleJSON,
  sortByKey: sortByKey
}
