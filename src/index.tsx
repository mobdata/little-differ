/**
* @name index.tsx
* @author Connor Bulakites
* @description This file defines a component which is currently used for testing
* the main App component. It is referenced in the public index.html file.
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppComponent from './components/app/component';

let documentA = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: {
      f: 4,
      g: 5,
    },
  },
};

let documentB = {
  a: 2,
  b: 1,
  c: 3,
};

ReactDOM.render(
  <div>
    <AppComponent
      docA={documentA}
      docB={documentB}
    />
  </div>,
  document.getElementById('root')
);
