/**
* @name view/component.tsx
* @author Connor Bulakites
* @description This file defines a component which renders a JSON documents
* as an editable JSX list.
*/

import * as React from 'react';
import ViewProps from './header';
import constructList from './functions';

interface ViewState {
  drawers: Array<Object>;
}

class ViewComponent extends React.Component <ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);

    this.state = {
      drawers: [],
    };
  }

  traverseDoc(document: Object, callback: Function) {
    return Object.keys(document).map((key: string) => {
      const value = document[key];
      if (value !== null && typeof value === 'object') {
        return this.traverseDoc(value, callback);
      } else {
        return callback(key, value);
      }
    })
  }

  isPlainObject(object: Object) {
    return object !== null && typeof object === 'object';
  }

  findAllPaths(document: Object, path: string): Array<string> {
    const allPaths: Array<string> = Object.keys(document).reduce(
      (acc: Array<string>, cur: string): Array<string> => {
        if (this.isPlainObject(document[cur])) {
          return [ ...acc, ...this.findAllPaths(document[cur], `${path}.${cur}`)];
        } else {
          return [ ...acc, `${path}.${cur}` ];
        }
      }, []
    );
    return allPaths;
  }

  render() {
    const containerStyles: React.CSSProperties = {
      height: this.props.height,
      width: this.props.width,
      backgroundColor: this.props.backgroundColor,
      display: 'block',
    };

    const hiddenList: React.CSSProperties = {
      visibility: 'hidden',
    };

    const visibleList: React.CSSProperties = {
      visibility: 'visible',
    };

    console.log(this.findAllPaths(this.props.document, 'root'));

    return (
      <div style={containerStyles}>
        Hello, world!
      </div>
    )
  }
}

export default ViewComponent;
