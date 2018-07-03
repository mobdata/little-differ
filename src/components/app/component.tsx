/**
* @name app/component.tsx
* @author Connor Bulakites
* @description This file defines the main React component which calls all other
* React components. This will be the public interface of the finished component.
*/

import * as React from 'react';
import ReactJson from 'react-json-view';
import DiffView from '../diffView/component';
import { AppProps, AppState } from './header';
import { compareJSON } from '../../ld_diff';

/*AppComponent sets the state of the newDoc. newDoc is an object that is used to
 *store the elements that are added by the user
 */
class AppComponent extends React.Component <AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      newDoc: {},
    };
  }

/*updateNewDoc, as the function name states, updates newDoc by resetting the
 *state
 */
  updateNewDoc(newDoc) {
    this.props.getNewDoc(newDoc);
    this.setState({ newDoc });
  }

/*addPair creates newDoc and updates it. newDoc is created by calling addToDoc.
*/
  addPair(keys: Array<string>, value: object) {
    const currentDoc = this.state.newDoc;
    const newDoc = this.addToDoc(keys.slice(1), value, currentDoc);
    this.updateNewDoc(newDoc);
  }

/*addToDoc adds the key and value pair to the doc. This doc is returned as
 *newDoc in addPair. The final doc is then updated with any new key/value pairs
 */
  addToDoc(keys: Array<string>, value: object, doc: object) {
    /*currentKey is created to track which key the function is targeting.
     *shift() assigns the first value from keys as the currentKey. Remember,
     *keys is constantly being sliced as it goes down a path, so the current key
     *is always the first element
     */
    const currentKey = keys.shift();
    /*This first if statement checks where one is when they have clicked on
     *an element in the module. Specifically, this check is when one chooses an
     *element that is at the end of a nest.
     */
    if (keys.length < 1) {
      return { ...doc, [currentKey]: Object.values(value)[0] }
    }

    /*If the element is in another form, it enters this else statement*/

      /*If there have already been elements added, it enters this first if stat-
       *ment.Recursively calls addToDoc
       */
    if (doc[currentKey]) {
      return { ...doc, [currentKey]: this.addToDoc(keys, value, doc[currentKey]) }
    }
      /*Else, nothing has been added yet, go here and recursively call adddValue
      */
    return { ...doc, [currentKey]: this.addToDoc(keys, value, {}) }
  }


  /*Render renders the two documents,the diff'd view, and the final doc in
   *the browser. It also allows the add, delete, and change functionality in
   *the browser
   */
  render() {
    const { docA, docB } = this.props;
    const delta = compareJSON(docA, docB);

    return (
      <div>
        <div>
          <div
            style={{
              float: 'left',
            }}
          >
            <ReactJson
              src={docA}
            />
          </div>
          <div
            style={{
              marginLeft: 250,
            }}
          >
            <ReactJson
              src={docB}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 150,
          }}
        >
          <div
            style={{
              float: 'left',
            }}
          >
            <DiffView
              diffData={delta}
              height={400}
              width={400}
              backgroundColor="grey"
              addPair={(key, value) => this.addPair(key, value)}
            />
          </div>
          <div
            style={{
              marginLeft: 250,
            }}
          >
            <ReactJson
              src={this.state.newDoc}
              onAdd={({ updated_src }) => this.updateNewDoc(updated_src)}
              onEdit={({ updated_src }) => this.updateNewDoc(updated_src)}
              onDelete={({ updated_src }) => this.updateNewDoc(updated_src)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AppComponent;
