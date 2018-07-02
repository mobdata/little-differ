/**
* @name view/node.tsx
* @author Connor Bulakites
* @description This file defines a component which encapsulates a single
* key/value pair in a JSON document.
*/

import * as React from 'react';
//import { Path } from './header';

interface Props {
  path: string;
  getPath: Function;
  renderColor: string;
  isArray: boolean;
  isUndefined: boolean;
}

interface State {
  nodeStyles: React.CSSProperties;
}

/*Defines the node styles*/
class Node extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nodeStyles: {
        marginLeft: 15,
        cursor: 'pointer',
        backgroundColor: 'red',
      },
    };
  }

/*This is where the browser's onClick event is created (user clicks on an
 *element to add to the final doc). It calls getPath which
 *subsequently calls getValue and getTrueValue.
 */
  render() {
    const { children, path, getPath, renderColor, isArray, isUndefined } = this.props;
    if (isArray) {
      const tmpChildren = React.Children.toArray(children);
      return (
        <div
          style={{
            marginLeft: 15,
            cursor: 'pointer',
            color: renderColor,
          }}
          onClick={() => getPath(path)}
          role="presentation"
        >
          {tmpChildren[0]} {tmpChildren[1]} {'['}{ tmpChildren[2] }{']'}
        </div>
      );
    } else if (isUndefined) {
      return (
        <div
          style={{
            marginLeft: 15,
            cursor: 'pointer',
            color: renderColor,
          }}
          onClick={() => getPath(path)}
          role="presentation"
        >
          { children } {'undefined'}
        </div>
      );
    }
    return (
      <div
        style={{
          marginLeft: 15,
          cursor: 'pointer',
          color: renderColor,
        }}
        onClick={() => getPath(path)}
        role="presentation"
      >
        { children }
      </div>
    );
  }
  }

export default Node;
