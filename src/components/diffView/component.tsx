/**
* @name diffView/component.tsx
* @author Juliet Adams, Sara Kim and Connor Bulakites
* @description This file defines a component which renders a color-coded diff
* view between two JSON documents.
*/

import * as React from 'react'
import { DiffViewProps } from './header'
import Node from './node'


class DiffViewComponent extends React.Component <DiffViewProps> {

  oneNested(key:string, value:object, isArray: Array<boolean>,
    isUndefined: Array<boolean>, indent:number, path:string, doc:object) {
    if (typeof Object.values(value[0])[0] === 'object') {
      return (
        <div>
          <div style={{ color: 'blue', marginLeft: 15 }}>
            {key} : {'{'}{this.renderDiffView(Object.values(value[0])[0], indent + 1, path)}{'}'}
          </div>
          {this.createNode(key, Object.values(value[1])[0],
            isArray[1], isUndefined[1], path, 1, doc)}
        </div>
      )
    }
    return (
      <div>
        {this.createNode(key, Object.values(value[0])[0], isArray[0], isUndefined[0], path, 0, doc)}
        <div style={{ color: 'red', marginLeft: 15 }}>
          {key} : {'{'}{this.renderDiffView(Object.values(value[1])[0], indent + 1, path)}{'}'}
        </div>
      </div>
    )
  }
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
      keys.shift()
      return this.getValue(doc, keys, leftOrRight)
    }
    return doc[keys[0]][leftOrRight]
  }

  /*
   * assignPair calls getValue to retrieve the value of the specified key
   * which is the last key in the path, and then passes the value and the Path
   * to the function addPair, which is found in the appView component.tsx file
   */

  assignPair(path: string, doc: object) {
    const keys = path.split('.')
    const leftOrRight = keys.shift()
    const originalKeys = keys.slice()
    keys.shift()//line explaining this?
    let value
    if (leftOrRight === '0') {
      value = this.getValue(doc, keys, 0)
    } else if (leftOrRight === '1') {
      value = this.getValue(doc, keys, 1)
    }
    this.props.addPair(originalKeys, value)
  }

  createNode(key:string, value: object, isValueArray: boolean,
    valueIsUndefined: boolean, pathStr: string, whichDoc: number, doc:object) {
    const objColor = ['blue', 'red', 'black']
    const updatedValue = valueIsUndefined ? 'undefined' : value.toString()
    if (isValueArray) {
      return (
        <Node
          path={pathStr}
          getPath={nodePath => this.assignPair(`${whichDoc}.${pathStr}`, doc)}
          renderColor={objColor[whichDoc]}
        >
          {key} : {'['}{updatedValue}{']'}
        </Node>
      )
    }
    return (
      <Node
        path={pathStr}
        getPath={nodePath => this.assignPair(`${whichDoc}.${pathStr}`, doc)}
        renderColor={objColor[whichDoc]}
      >
        {key} : {updatedValue}
      </Node>
    )
  }

  nullValues(key:string, value:object, whichDoc:number, path:string, indent:number, doc:object) {
    const isArray = Array.isArray(Object.values(value[whichDoc])[0])
    const isUndefined = Object.values(value[whichDoc])[0] === undefined
    if (typeof Object.values(value[whichDoc])[0] === 'object' && !isArray) {
      return this.renderDiffView(value[whichDoc], indent + 1, `${path}`)
    }
    return this.createNode(key, Object.values(value[whichDoc])[0], isArray, isUndefined, `${path}.${key}`, whichDoc, doc)
  }

  bothNested(key:string, value:object, indent: number, path: string) {
    return (
      <div style={{ marginLeft: 15 }}>
        {key} : {'{'}{this.renderDiffView(value, indent + 1, path)}{'}'}
      </div>
    )
  }

  equalValues(key:string, value:object, isArray:boolean,
    isUndefined:boolean, path: string, doc:object) {
    return this.createNode(key, value, isArray, isUndefined, path, 2, doc)
  }

  /*
   * renderDiffView takes in the diffed doc, an indent size and the current path of the
   * key. for each key this function determnies the case, and sets up a <div> to be rendered.
   * The key's path is kept track of thourghout this function by passing in the current path +
   * the current key (as a string with . between each key) into the function when it is being
   * called recursively.
   */
  renderDiffView(doc: object, indent: number, path: string) {
    return (
      <div>{
        Object.keys(doc).map(key => (<div key={key}> { (() => {
          const value = doc[key]
          const objColor = ['blue', 'red']
          const isValueArray = [false, false]
          const valueIsUndefined = [false, false]
          let whichDoc
          if (!(Array.isArray(value))) {
            return this.bothNested(key, value, indent, `${path}.${key}`);
          } else if (value[0] === null || value[1] === null) {
            whichDoc = (value[0] === null) ? 1 : 0
            return this.nullValues(key, value, whichDoc, `${path}`, indent, doc);
          }
          if (Array.isArray(Object.values(value[0])[0])) {
            isValueArray[0] = true
          } else if (Object.values(value[0])[0] === undefined) {
            valueIsUndefined[0] = true
          }

          if (Array.isArray(Object.values(value[1])[0])) {
            isValueArray[1] = true
          } else if (Object.values(value[1])[0] === undefined) {
            valueIsUndefined[1] = true
          }

          if (!(isValueArray[0] || isValueArray[1])) {
            if (Object.values(value[0])[0] === Object.values(value[1])[0]) {
              return this.equalValues(key, Object.values(value[0])[0], isValueArray[0], valueIsUndefined[0], `${path}.${key}`, doc)
            } else if (typeof Object.values(value[0])[0] === 'object' || typeof Object.values(value[1])[0] === 'object') {
              return this.oneNested(key, value, isValueArray, valueIsUndefined, indent, `${path}.${key}`, doc)
            }
          }
          return (
            <div>
              {this.createNode(key, Object.values(value[0])[0], isValueArray[0], valueIsUndefined[0], `${path}.${key}`, 0, doc)}
              {this.createNode(key, Object.values(value[1])[0], isValueArray[1], valueIsUndefined[1], `${path}.${key}`, 1, doc)}
            </div>
          )
        })()} </div>))
      } </div>
    )
  }
    /*
     * render will call renderDiffView the recursive function that will display the diffed document
     */
  render() {
    const { doc } = this.props
    return <div> {'{'}{this.renderDiffView(doc, 1, 'root')}{'}'} </div>
  }
}
export default DiffViewComponent
