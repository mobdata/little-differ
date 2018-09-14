'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.compareJSON = compareJSON;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * docA = {a:1} docB = {a:2}           compareJSON output: {a: [{a:1},{a:2}]}
 * docA = {a:3} docB = {a:3}           compareJSON output: {a: [{a:3},{a:3}]}
 * docA = {a:3} docB = {b:3}           compareJSON output: {a: [{a:3},null], b: [null,{b:3}]}
 */

function compareJSON(obj1, obj2) {
  var ret = {};
  var arr1 = Object.keys(obj1);
  var arr2 = Object.keys(obj2);

  arr1.forEach(function (key) {
    // if this key is found in both documents
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (obj1[key] instanceof Array || obj2[key] instanceof Array) {
        ret[key] = [_defineProperty({}, key, obj1[key]), _defineProperty({}, key, obj2[key])];
      } else if (_typeof(obj1[key]) === 'object' && _typeof(obj2[key]) === 'object') {
        ret[key] = compareJSON(obj1[key], obj2[key]);
      } else if (_typeof(obj1[key]) === 'object' && !(_typeof(obj2[key]) === 'object')) {
        ret[key] = [_defineProperty({}, key, compareJSON(obj1[key], {})), _defineProperty({}, key, obj2[key])];
      } else if (_typeof(obj2[key]) === 'object' && !(_typeof(obj1[key]) === 'object')) {
        ret[key] = [_defineProperty({}, key, obj1[key]), _defineProperty({}, key, compareJSON({}, obj2[key]))];
      } else {
        ret[key] = [_defineProperty({}, key, obj1[key]), _defineProperty({}, key, obj2[key])];
      }
    }
    // if this key is only found in document1
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
      if (obj1[key] instanceof Array) {
        ret[key] = [_defineProperty({}, key, obj1[key]), null];
      } else if (_typeof(obj1[key]) === 'object') {
        ret[key] = [_defineProperty({}, key, compareJSON(obj1[key], {})), null];
      } else {
        ret[key] = [_defineProperty({}, key, obj1[key]), null];
      }
    }
  });
  // if there is a key in document2 that is not in document1 it will
  // be found here
  arr2.forEach(function (key) {
    if (obj2.hasOwnProperty(key) && !ret.hasOwnProperty(key)) {
      if (obj2[key] instanceof Array) {
        ret[key] = [null, _defineProperty({}, key, obj2[key])];
      } else if (_typeof(obj2[key]) === 'object') {
        ret[key] = [null, _defineProperty({}, key, compareJSON({}, obj2[key]))];
      } else {
        ret[key] = [null, _defineProperty({}, key, obj2[key])];
      }
    }
  });
  return ret;
}