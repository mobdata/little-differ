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
    };
  }

  isPlainObject(object: Object) {
    return object !== null && typeof object === 'object';
  }

  traverseDoc(document: Object, callback: Function) {
    return Object.keys(document).map((key: string) => {
      const value = document[key];
      if (this.isPlainObject(value)) {
        return this.traverseDoc(value, callback);
      } else {
        return callback(key, value);
      }
    })
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

  componentDidMount() {
    const { document } = this.props;
    const allPaths = this.findAllPaths(document, 'root');
    let flattenedAttributes = {};
    allPaths.forEach((value: string): void => {
      flattenedAttributes[value] = null;
    })
    this.setState({ flattenedAttributes });
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

    const { flattenedAttributes } = this.state;

    return (
      <div style={containerStyles}>
        {
          this.traverseDoc(flattenedAttributes, (key, value) => {
            return <p key={key}>{key}: {value}</p>
          })
        }
      </div>
    )
  }
}

export default ViewComponent;
