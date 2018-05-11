import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppComponent from './components/app';

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
      documentA={documentA}
      documentB={documentB}
    />
  </div>,
  document.getElementById('root')
);
