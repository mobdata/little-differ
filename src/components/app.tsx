import * as React from 'react';
import ViewComponent from './view'

interface AppProps {
  documentA: object;
  documentB: object;
}

class AppComponent extends React.Component <AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <ViewComponent
          document={this.props.documentA}
          height={400}
          width={400}
          backgroundColor='grey'
        />
      </div>
    )
  }
}

export default AppComponent;
