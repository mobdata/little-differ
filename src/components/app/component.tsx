/**
* @name app/component.tsx
* @author Connor Bulakites
* @description This file defines the main React component which calls all other
* React components. This will be the public interface of the finished component.
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import JsonView from '../jsonView/component';
import DiffView from '../diffView/component';
import AppProps from './header';

const jsondiffpatch = require('jsondiffpatch');

class AppComponent extends React.Component <AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    const { docA, docB } = this.props;
    const delta = jsondiffpatch.diff(docA, docB);
    return (
      <div>
        <div
          style={{
            float: 'left',
          }}
        >
          <JsonView
            doc={docA}
            height={400}
            width={400}
            backgroundColor='grey'
          />
        </div>
        <div
          style={{
            marginLeft: 200,
          }}
        >
          <JsonView
            doc={docB}
            height={400}
            width={400}
            backgroundColor='grey'
          />
        </div>
        <div
          style={{
            marginTop: 175,
          }}
        >
          <DiffView
            doc={delta}
            height={400}
            width={400}
            backgroundColor='grey'
          />
        </div>
      </div>
    )
  }
}

export default AppComponent;
