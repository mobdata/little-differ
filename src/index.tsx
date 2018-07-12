/**
* @name index.tsx
* @author Connor Bulakites
* @description This file defines a component which is currently used for testing
* the main App component. It is referenced in the public index.html file.
*/

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AppComponent from './components/app/component'

const documentA = {
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          d: true,
        },
      },
      j: [10, 9, 8],
    },
  },
  h: {
    i: false,
  },
}

const documentB = {
  a: {
    a: {
      a: {
        a: {
          a: true,
          c: false,
          d: {
            e: [1, 2, 3],
            f: [4, 5, 6],
            g: [7, 8, 9],
          },
        },
      },
    },
  },
}

// const documentA = {
//   a: 1
// }
// const documentB = {
//   b: [4,5,6]
// }

ReactDOM.render(
  <AppComponent
    docA={documentA}
    docB={documentB}
    getNewDoc={newDoc => newDoc}
  />
  ,
  document.getElementById('root'),
)

// When on NPM: point directly to the AppComponent:
export default AppComponent
