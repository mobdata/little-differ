/**
* @name view/functions.tsx
* @author Connor Bulakites
* @description This file defines helper functions for the view component.
*/

import * as React from 'react';

/** This function accepts a JSON document as a parameter and uses it to
recursively build a hierarchical JSX list */
function constructList(document: object) {
  const ulStyles: React.CSSProperties = {
    listStyleType: 'circle',
    marginLeft: 10,
  };

  const liStyles: React.CSSProperties = {

  };

  return (
    <ul style={ulStyles}>{
      Object.keys(document).map((key) => {
        let value = document[key];
        if (value !== null && typeof value === 'object') {
          return (
            <li key={key} style={liStyles}>
              {`${key}: `}<ul>{constructList(value)}</ul>
            </li>
          );
        } else {
          return (
            <li key={key} style={liStyles}>
              {`${key}: ${value}`}
            </li>
          );
        }
      })
    }</ul>
  )
}

export default constructList;
