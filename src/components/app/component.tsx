/**
* @name view/component.tsx
* @author Connor Bulakites
* @description This file defines the main React component which calls all other
* React components. This will be the public interface of the finished component.
*/

import * as React from 'react';
import JSONView from '../view/component';
import AppProps from './header';

class AppComponent extends React.Component <AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <JSONView
          doc={this.props.docA}
          height={400}
          width={400}
          backgroundColor='grey'
        />
      </div>
    )
  }
}

export default AppComponent;
