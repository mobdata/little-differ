/**
* @name view/functions.tsx
* @author Connor Bulakites
* @description This file defines helper functions for the view component.
*/

import * as React from 'react';

/** This function accepts a JSON document as a parameter and uses it to
recursively build a hierarchical JSX list */
function constructList(document: object) {

  const hiddenList: React.CSSProperties = {
    visibility: 'hidden',
  };

  const visibleList: React.CSSProperties = {
    visibility: 'visible',
  };

  return (
    <div>{
      Object.keys(document).map((key) => {
        let value = document[key];
        if (value !== null && typeof value === 'object') {
          return (
            <div key={key}>
              <button>{`${key}: `}</button>
              <div style={visibleList}>{constructList(value)}</div>
            </div>
          );
        } else {
          return (
            <div key={key}>
              <p>{`${key}: ${value}`}</p>
            </div>
          );
        }
      })
    }</div>
  )
}

export default constructList;
