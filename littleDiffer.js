/**
* @name littleDiffer.js
* @author Juliet Adams
* @description Compares all elements of two JSON files and outputs the
* diffed document after
*/

/*
 * compareJSON is a diffing function that was written by the developers that
 * had a consistent, specific output. The outputs will be a document that contains
 * key value pairs, where the value will either be an object (if there is nesting) or an
 * array containing the values (as objects) found at the key value pair from each doc.
 * examples:
 * docA = {a:1} docB = {a:2}           compareJSON output: {a: [{match: false},{a:1},{a:2}]}
 * docA = {a:3} docB = {a:3}           compareJSON output: {a: [{match: true},{a:3},{a:3}]}
 * docA = {a:3} docB = {b:3}           compareJSON output: {a: [{match: false},{a:3},null], b: [{match: false},null,{b:3}]}
 */


function compareJSON(obj1, obj2) {
  let ret = {}
  const arr1 = Object.keys(obj1)
  const arr2 = Object.keys(obj2)

  arr1.forEach((key) => {
    // if this key is found in both documents
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      console.debug("BOTH docs have key = " + key + " obj1[key] = " + obj1[key] + " obj2[key] = " + obj2[key]);
      if ((obj1[key] instanceof Array) || (obj2[key] instanceof Array)) {
        ret[key] = [{ match: equals(obj1[key], obj2[key]) }, { [key]: obj1[key] }, { [key]: obj2[key] }]
      } else if (obj1[key] === null && obj2[key] === null) {
        console.debug("both are null.  Trying to return true here")
        ret[key] = [{match: equals(obj1[key], obj2[key])}, { [key]: null }, { [key]: null }]
      } else if (obj1[key] === null && typeof obj2[key] === 'object') {
        ret[key] = [{ match: equals(obj1[key], obj2[key]) }, { [key]: null }, { [key]: this.compareJSON({}, obj2[key]) }]
      } else if (obj2[key] === null && typeof obj1[key] === 'object') {
        ret[key] = [{ match: equals(obj1[key], obj2[key]) }, { [key]: this.compareJSON(obj1[key], {}) }, { [key]: null }]
      } else if (obj1[key] === null && !(typeof obj2[key] === 'object')) {
        ret[key] = [{ match: equals(obj1[key], obj2[key]) }, { [key]: null }, { [key]: obj2[key] }]
      } else if (obj2[key] === null && !(typeof obj1[key] === 'object')) {
        ret[key] = [{ match: equals(obj1[key], obj2[key]) }, { [key]: obj1[key] }, {[key]: null }]
      } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        ret[key] = compareJSON(obj1[key], obj2[key])
      } else if (typeof obj1[key] === 'object' && !(typeof obj2[key] === 'object')) {
        ret[key] = [{ match: equals(obj1[key], obj2[key]) }, { [key]: compareJSON(obj1[key], {}) }, { [key]: obj2[key] }]
      } else if (typeof obj2[key] === 'object' && !(typeof obj1[key] === 'object')) {
        ret[key] = [{ match: equals(obj1[key], obj2[key]) }, { [key]: obj1[key] }, { [key]: compareJSON({}, obj2[key]) }]
      } else {
        ret[key] = [{ match: equals(obj1[key], obj2[key]) }, { [key]: obj1[key] }, { [key]: obj2[key] }]
      }
    }
    // if this key is only found in document1
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
      console.debug("DOC1 has key = " + key + " obj1[key] = " + obj1[key]);
      if (obj1[key] instanceof Array) {
        ret[key] = [{ match: false }, { [key]: obj1[key] }, null]
      } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
        ret[key] = [{ match: false }, { [key]: compareJSON(obj1[key], {}) }, null]
      } else if (obj1[key] === null) {
        ret[key] = [{ match: false }, { [key]: null }, null]
      } else {
        ret[key] = [{ match: false }, { [key]: obj1[key] }, null]
      }
    }
  })

  // if there is a key in document2 that is not in document1 it will
  // be found here
  arr2.forEach((key) => {
    if (obj2.hasOwnProperty(key) && !ret.hasOwnProperty(key)) {
      console.debug("DOC2 has key = " + key + " obj2[key] = " + obj2[key]);
      if (obj2[key] instanceof Array) {
        ret[key] = [{ match: false }, null, { [key]: obj2[key] }]
      } else if (typeof obj2[key] === 'object' && obj2[key] != null) {
        ret[key] = [{ match: false }, null, { [key]: compareJSON({}, obj2[key]) }]
      } else if (obj2[key] === null) {
        ret[key] = [{ match: false }, null, { [key]: null }]
      } else {
        ret[key] = [{ match: false }, null, { [key]: obj2[key] }]
      }
    }
  })
  console.debug("Returning" + ret);
  console.debug(Object.keys(ret).toString());
  return sortByKey(ret);

}

//Simple equals function returning true or false if the values match or not.
//Two different objects will return true, which is enough for now.  Will
//elaborate on this later.
function equals(x, y) {
    if (x instanceof Array && y instanceof Array ) {
      if (JSON.stringify(x) == JSON.stringify(y)) {
        return true;
      }
    }
    else if ((x === 'undefined' || y === 'undefined' ) && (x === null || y === null )) {
        return false;
    } else {
    return x === y;
    }
};

function sortByKey(ret) {
//export const sortByKey = (ret) => {
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
  compareJSON: compareJSON,
  sortByKey: sortByKey
}

