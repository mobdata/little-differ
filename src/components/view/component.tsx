/**
* @name view/component.tsx
* @author Connor Bulakites
* @description This file defines a component which renders a JSON documents
* as an editable JSX list.
*/

import * as React from 'react';
import ViewProps from './header';
import constructList from './functions';

class ViewComponent extends React.Component <ViewProps, {}> {
  constructor(props: ViewProps) {
    super(props);
  }

  render() {
    const containerStyles: React.CSSProperties = {
      height: this.props.height,
      width: this.props.width,
      backgroundColor: this.props.backgroundColor,
      display: 'block',
    }

    return (
      <div style={containerStyles}>
        {constructList(this.props.document)}
      </div>
    )
  }
}

export default ViewComponent;
