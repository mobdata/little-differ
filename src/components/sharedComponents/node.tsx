/**
* @name view/node.tsx
* @author Connor Bulakites
* @description This file defines a component which encapsulates a single
* key/value pair in a JSON document.
*/

import * as React from 'react';
import { Path } from './header';

interface Props {
  path: string;
  getPath: Function;
};

interface State {
  nodeStyles: React.CSSProperties;
};

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

  render() {
    const { children, path, getPath } = this.props;
    return (
      <div
        style={{
          marginLeft: 15,
          cursor: 'pointer',
        }}
        onClick={() => getPath(path)}
        onMouseEnter={() => {
          this.setState({
            nodeStyles: {
              ...this.state.nodeStyles,
              color: 'red',
            }
          })
        }}
      >
        { children }
      </div>
    )
  }
}

export default Node;
