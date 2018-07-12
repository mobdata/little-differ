/**
* @name node.tsx
* @author Sara Kim, Juliet Adams and Connor Bulakites
* @description This file defines a component which encapsulates a single
* key/value pair in a JSON document.
*/

import * as React from 'react'

interface Props {
  path: string
  getPath: Function
  renderColor: string
}

interface State {
  nodeStyles: React.CSSProperties
}

/*Defines the node styles*/
class Node extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    (this as any).state = {
      nodeStyles: {
        marginLeft: 15,
        cursor: 'pointer',
        backgroundColor: 'red',
      },
    }
  }

/*This is where the browser's onClick event is created (user clicks on an
 *element to add to the final doc). It calls getPath which
 *subsequently calls getValue and getTrueValue.
 */
  render() {
    const { children, path, getPath, renderColor } = this.props
    return (
      <div
        style={{
          marginLeft: 15,
          cursor: 'pointer',
          color: renderColor,
          fontFamily: 'courier',
        }}
        onClick={() => getPath(path)}
        role="presentation"
      >
        { children }
      </div>
    )
  }
  }

export default Node
