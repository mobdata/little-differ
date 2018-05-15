/**
* @name view/component.tsx
* @author Connor Bulakites
* @description This file defines a component which renders a JSON documents
* as an editable JSX list.
*/

import * as React from 'react';
import { ViewProps, ViewState } from './header';
import constructList from './functions';

class ViewComponent extends React.Component <ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);
    this.state = {
      flattenedAttributes: {},
      flattenedDrawers: {},
      flattenedLeaves: {},
    };
  }

  isPlainObject(object: object) {
    return object !== null && typeof object === 'object';
  }

  findAllPaths(document: object, path: string): Array<string> {
    const allPaths: Array<string> = Object.keys(document).reduce(
      (acc: Array<string>, cur: string): Array<string> => {
        if (this.isPlainObject(document[cur])) {
          return [ ...acc, ...this.findAllPaths(document[cur], `${path}.${cur}`)];
        } else {
          return [ ...acc, `${path}.${cur}` ];
        }
      }, [] // <= initial value of the array (important)
    );
    return allPaths;
  }

  findAllDrawers(document: object, path: string): Array<string> {
    const allDrawers: Array<string> = Object.keys(document).reduce(
      (acc: Array<string>, cur: string): Array<string> => {
        if (this.isPlainObject(document[cur])) {
          return [ ...acc, `${path}.${cur}`, ...this.findAllDrawers(document[cur], `${path}.${cur}`)];
        } else {
          return acc;
        }
      }, [] // <= initial value of the array (important)
    );
    return allDrawers;
  }

  getUltimateValue(document: object, keys: Array<string>, i: number): object {
    if (this.isPlainObject(document[keys[i]])) {
      return this.getUltimateValue(document[keys[i+1]], keys, i+1);
    } else {
      return document[keys[i]];
    }
  }

  componentDidMount() {
    const { document } = this.props;
    const allPaths = this.findAllPaths(document, 'root');
    let flattenedAttributes = {};
    allPaths.forEach((value: string): void => {
      flattenedAttributes[value] = null;
    })
    const allDrawers = this.findAllDrawers(document, 'root');
    let flattenedDrawers = {};
    allDrawers.forEach((value: string): void => {
      flattenedDrawers[value] = false;
    })
    const leafNodes = allPaths.filter(node => !flattenedDrawers[node]);
    const flattenedLeaves = {};
    leafNodes.forEach((value: string): void => {
      flattenedLeaves[value] = null;
    })
    this.setState({ flattenedAttributes, flattenedDrawers, flattenedLeaves });
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

    const { document } = this.props;
    const { flattenedAttributes, flattenedDrawers, flattenedLeaves } = this.state;

    return (
      <div style={containerStyles}>
        {
          Object.keys(flattenedAttributes).map((attribute) => {
            return <p key={attribute}>{attribute.split('.')}</p>
          })
        }
      </div>
    )
  }
}

export default ViewComponent;
