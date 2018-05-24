/**
* @name app/component.tsx
* @author Connor Bulakites
* @description This file defines the main React component which calls all other
* React components. This will be the public interface of the finished component.
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactJson from 'react-json-view';
import JsonView from '../jsonView/component';
import DiffView from '../diffView/component';
import { AppProps, AppState } from './header';
import { Pair } from '../sharedComponents/header';

const jsondiffpatch = require('jsondiffpatch');

class AppComponent extends React.Component <AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      newDoc: {},
    };
  }

  addPair(pair: Pair) {
    const { keys, value } = pair;
    const currentDoc = this.state.newDoc;
    let newDoc = this.addValue(keys.slice(1), value, currentDoc);
    this.setState({ newDoc });
  }

  addValue(keys: Array<string>, value: object, doc: object) {
    const currentKey = keys.shift();
    if (keys.length < 1) {
      return { ...doc, [currentKey]: value }
    } else {
      return { ...doc, currentKey: this.addValue(keys, value, doc[currentKey])}
    }
  }

  render() {
    const { docA, docB } = this.props;
    const delta = jsondiffpatch.diff(docA, docB);
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
              doc={delta}
              height={400}
              width={400}
              backgroundColor='grey'
              addPair={(pair) => this.addPair(pair)}
            />
          </div>
          <div
            style={{
              marginLeft: 250,
            }}
          >
            <ReactJson
              src={this.state.newDoc}
              onAdd={(add) => this.setState({ newDoc: add.updated_src })}
              onEdit={(edit) => this.setState({ newDoc: edit.updated_src })}
              onDelete={(del) => this.setState({ newDoc: del.updated_src })}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AppComponent;
