/**
* @name diffView/component.tsx
* @author Sara Kim and Juliet Adams feat. Connor Bulakites
* @description This file defines a component which renders a color-coded diff
* view between two JSON documents.
*/

import * as React from 'react';
import { DiffViewProps, DiffViewState, Path } from './header';
import Node from '../sharedComponents/node';


class DiffViewComponent extends React.Component <DiffViewProps, DiffViewState> {


    /*
    * getValue returns the value within doc of the left (0) or right (1) doc at the
    * specified key. doc is the object that either contains an array of two objects
    * or another object. Keys is an array that initially contains the path from rooot
    * to the key for which we want the balue. leftOrRight is what determines which
    * index to get the value from. specialCase is a boolean that refers to a case
    * in which the entire doc must be returned
    */

  getValue(doc: object, keys: Array<string>, leftOrRight: number): object {
    if (keys.length > 1) {
      keys.shift();
      return this.getValue(doc, keys, leftOrRight);
    }
    return doc[keys[0]][leftOrRight];
  }

  /*
   * assignPair calls getValue to retrieve the value of the specified key
   * which is the last key in the path, and then passes the value and the Path
   * to the function addPair, which is found in the appView component.tsx file
   */

  assignPair(path: string, doc: object) {
    const keys = path.split('.');
    const leftOrRight = keys.shift();
    const originalKeys = keys.slice();
    keys.shift();
    let value;
    if (leftOrRight === '0') {
      value = this.getValue(doc, keys, 0);
    } else if (leftOrRight === '1') {
      value = this.getValue(doc, keys, 1);
    }
    this.props.addPair(originalKeys, value);
  }

  /*
   * rednerSubJSON takes in the diffed doc, an indent size and the current path of the
   * key. for each key this function determnies the case, and sets up a <div> to be rendered.
   * The key's path is kept track of thourghout this function by passing in the current path +
   * the current key (as a string with . between each key) into the function when it is being
   * called recursively.
   */

  renderDiffView(doc: object, indent: number, path: string) {
    return (
      <div>{
        Object.keys(doc).map((key) => {
          const value = doc[key];
          const objColor = ['blue', 'red'];
          let valueA = <div />;
          let valueB = <div />;
          let bothNested;
          let oneNested;
          let nullValues;
          let equalValues;
          let whichDoc;
          let isValueArray = false;
          let valueIsUndefined = false;
          if (!(Array.isArray(value))) {
            bothNested = true;
          } else if (value[0] === null || value[1] === null) {
            nullValues = true;
          } else if (!((Object.values(value[0])[0] instanceof Array) ||
              (Object.values(value[1])[0] instanceof Array))) {
            if (Object.values(value[0])[0] === Object.values(value[1])[0]) {
              equalValues = true;
            } else if (typeof Object.values(value[0])[0] === 'object' || typeof Object.values(value[1])[0] === 'object') {
              oneNested = true;
            }
          }
          if (bothNested) {
            return (
              <div>
                <div style={{ marginLeft: 15 }}>
                  {key} : {'{'}{this.renderDiffView(value, indent + 1, `${path}.${key}`)}{'}'}
                </div>
              </div>
            );
          } else if (oneNested) {
            if (typeof Object.values(value[0])[0] === 'object') {
              if (Object.values(value[1])[0] instanceof Array) {
                isValueArray = true;
              } else if (Object.values(value[1])[0] === undefined) {
                valueIsUndefined = true;
              }
              return (
                <div>
                  <div style={{ color: 'blue', marginLeft: 15 }}>
                    {key} : {'{'}{this.renderDiffView(Object.values(value[0])[0], indent + 1, `${path}.${key}`)}{'}'}
                  </div>
                  <div key={key + indent}>
                    <Node
                      path={`${path}.${key}`}
                      getPath={nodePath => this.assignPair(`1.${path}.${key}`, doc)}
                      renderColor={'red'}
                      isArray={isValueArray}
                      isUndefined={valueIsUndefined}
                    >
                      {key} : {Object.values(value[1])[0].toString()}
                    </Node>
                  </div>
                </div>
              );
            }
            if (Object.values(value[0])[0] instanceof Array) {
              isValueArray = true;
            }
            return (
              <div>
                <div key={key + indent}>
                  <Node
                    path={`${path}.${key}`}
                    getPath={nodePath => this.assignPair(`0.${path}.${key}`, doc)}
                    renderColor={'blue'}
                    isArray={isValueArray}
                    isUndefined={valueIsUndefined}
                  >
                    {key} : {Object.values(value[0])[0].toString()}
                  </Node>
                </div>
                <div style={{ color: 'red', marginLeft: 15 }}>
                  {key} : {'{'}{this.renderDiffView(Object.values(value[1])[0], indent + 1, `${path}.${key}`)}{'}'}
                </div>
              </div>
            );
          } else if (nullValues) {
            if (value[0] === null) {
              whichDoc = 1;
            } else {
              whichDoc = 0;
            }
            if (Object.values(value[whichDoc])[0] instanceof Array) {
              isValueArray = true;
            } else if (typeof Object.values(value[whichDoc])[0] === 'object') {
              return (
                <div>
                  <div>
                    {this.renderDiffView(value[whichDoc], indent + 1, `${path}`)}
                  </div>
                </div>
              );
            }
            if (Object.values(value[whichDoc])[0] === undefined) {
              valueIsUndefined = true;
              return (
                <div>
                  <Node
                    path={`${path}.${key}`}
                    getPath={nodePath => this.assignPair(`${whichDoc}.${path}.${key}`, doc)}
                    renderColor={objColor[whichDoc]}
                    isArray={isValueArray}
                    isUndefined={valueIsUndefined}
                  >
                    {key} : {Object.values(value[whichDoc])[0]}
                  </Node>
                </div>
              );
            }
            return (
              <div>
                <Node
                  path={`${path}.${key}`}
                  getPath={nodePath => this.assignPair(`${whichDoc}.${path}.${key}`, doc)}
                  renderColor={objColor[whichDoc]}
                  isArray={isValueArray}
                  isUndefined={valueIsUndefined}
                >
                  {key} : {Object.values(value[whichDoc])[0].toString()}
                </Node>
              </div>
            );
          } else if (equalValues) {
            if ((Object.values(value[0])[0] instanceof Array) &&
                (Object.values(value[1])[0] instanceof Array)) {
              isValueArray = true;
            }
            if ((Object.values(value[0])[0] === undefined) &&
                (Object.values(value[1])[0] === undefined)) {
              valueIsUndefined = true;
            }
            return (
              <div style={{ color: 'black' }}>
                <Node
                  path={`${path}.${key}`}
                  getPath={nodePath => this.assignPair(`0.${path}.${key}`, doc)}
                  renderColor={'black'}
                  isArray={isValueArray}
                  isUndefined={valueIsUndefined}
                >
                  {key} : {Object.values(value[0]).toString()}
                </Node>
              </div>
            );
          }
          if (Object.values(value[0])[0] instanceof Array) {
            isValueArray = true;
          } else if (Object.values(value[0])[0] === undefined) {
            valueIsUndefined = true;
          }
          valueA = (
            <div key={key + indent}>
              <Node
                path={`${path}.${key}`}
                getPath={nodePath => this.assignPair(`0.${path}.${key}`, doc)}
                renderColor={'blue'}
                isArray={isValueArray}
                isUndefined={valueIsUndefined}
              >
                {key} : {Object.values(value[0]).toString()}
              </Node>
            </div>
          );
          if (Object.values(value[1])[0] instanceof Array) {
            isValueArray = true;
          } else {
            isValueArray = false;
          }
          if (Object.values(value[1])[0] === undefined) {
            valueIsUndefined = true;
          } else {
            valueIsUndefined = false;
          }
          valueB = (
            <div key={key + indent}>
              <Node
                path={`${path}.${key}`}
                getPath={nodePath => this.assignPair(`1.${path}.${key}`, doc)}
                renderColor={'red'}
                isArray={false}
                isUndefined={valueIsUndefined}
              >
                {key} : {Object.values(value[1]).toString()}
              </Node>
            </div>
          );
          return (
            <div>
              <div>
                {valueA}
              </div>
              <div>
                {valueB}
              </div>
            </div>
          );
        },
      )
    } </div>
    );
  }
    /*
     * render will call renderDiffView the recursive function that will display the diffed document
     */
  render() {
    const { doc } = this.props;
    return (
      <div style={{ fontFamily: 'courier' }}>
        {'{'}{this.renderDiffView(doc, 1, 'root')}{'}'}
      </div>
    );
  }
}
export default DiffViewComponent;
