/**
* @name view/component.tsx
* @author Connor Bulakites
* @description This file defines a component which renders a JSON documents
* as an editable JSX list.
*/

import * as React from 'react';
import { ViewProps, ViewState, Path } from './header';
import constructList from './functions';

class ViewComponent extends React.Component <ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);
    this.state = {
      paths: [],
      drawers: {},
    };
  }

  isPlainObject(object: object) {
    return object !== null && typeof object === 'object';
  }

  getPaths(doc: object, path: string): Array<Path> {
    return Object.keys(doc).reduce(
      (acc: Array<Path>, cur: string): Array<Path> => {
        if (this.isPlainObject(doc[cur])) {
          return [
            ...acc,
            { path: `${path}.${cur}`, drawer: true },
            ...this.getPaths(doc[cur], `${path}.${cur}`),
          ];
        } else {
          return [
            ...acc,
            { path: `${path}.${cur}`, drawer: false },
          ];
        }
      }, [] // <= initial value of the array
    );
  }

  getValue(doc: object, keys: Array<string>, i: number): object {
    const value = doc[keys[i]];
    if (this.isPlainObject(value)) {
      return this.getValue(value, keys, i+1);
    } else {
      return value;
    }
  }

  componentDidMount() {
    const { doc } = this.props;
    const paths = this.getPaths(doc, 'root');
    const drawers = {};
    paths.filter(x => x.drawer).map(x => x.path).forEach((x) => {
      drawers[x] = false;
    });
    this.setState({ paths, drawers });
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

    const { doc } = this.props;
    const { paths, drawers } = this.state;

    return (
      <div style={containerStyles}>
        {
          paths.map((x) => {
            const { path, drawer } =  x;
            const keys = path.split('.');
            const value = this.getValue(doc, keys, 1);
            return <p key={path}>{value}</p>
          })
        }
      </div>
    )
  }
}

export default ViewComponent;
