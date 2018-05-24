/**
* @name diffView/component.tsx
* @author Connor Bulakites
* @description This file defines a component which renders a color-coded diff
* view between two JSON documents.
*/

import * as React from 'react';
import { DiffViewProps, DiffViewState, Path } from './header';
import Node from '../sharedComponents/node';

class DiffViewComponent extends React.Component <DiffViewProps, DiffViewState> {
  constructor(props: DiffViewProps) {
    super(props);
    this.state = {
      paths: [],
      drawers: {},
    };
  }

  isPlainObject(object: object) {
    return object !== null && typeof object === 'object' && !Array.isArray(object);
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

  getTrueValue(path: string, doc: object) {
    const keys = path.split('.');
    const version = keys.shift();
    let value;
    if (version == '0') {
      value = this.getValue(doc, keys, 1)[0];
    } else if (version == '1') {
      value = this.getValue(doc, keys, 1)[1];
    } else {
      value = this.getValue(doc, keys, 1);
    }
    this.props.addPair({ keys, value });
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

  renderSubJSON(doc: object, indent: number, path: string) {
    return <div>{
      Object.keys(doc).map((key) => {
        const value = doc[key];
        if (Array.isArray(value)) {
          let valueA;
          let valueB;
          if (this.isPlainObject(value[0])) {
            valueA = (
              <div key={ key + indent + 0}>
                <Node
                  path={`${path}.${key}`}
                  getPath={(path) => this.getTrueValue(`0.${path}`, doc)}
                >
                  {key}: {'{'}{this.renderSubJSON(value[0], indent + 1, `${path}.${key}`)}{'},'}
                </Node>
              </div>
            );
          } else {
            valueA = (
              <div key={key + indent + 0}>
                <Node
                  path={`${path}.${key}`}
                  getPath={(path) => this.getTrueValue(`0.${path}`, doc)}
                >
                  {key}: {value[0]},
                </Node>
              </div>
            );
          }
          if (this.isPlainObject(value[1])) {
            valueB = (
              <div key={ key + indent + 1}>
                <Node
                  path={`${path}.${key}`}
                  getPath={(path) => this.getTrueValue(`1.${path}`, doc)}
                >
                  {key}: {'{'}{this.renderSubJSON(value[1], indent + 1, `${path}.${key}`)}{'},'}
                </Node>
              </div>
            );
          } else {
            valueB = (
              <div key={key + indent + 1}>
                <Node
                  path={`${path}.${key}`}
                  getPath={(path) => this.getTrueValue(`1.${path}`, doc)}
                >
                  {key}: {value[1]},
                </Node>
              </div>
            );
          }
          return (
            <div>
              <div style={{ color: 'blue' }}>{valueA}</div>
              <div style={{ color: 'red' }}>{valueB}</div>
            </div>
          );
        } else {
          if (this.isPlainObject(value)) {
            return (
              <div key={ key + indent + 4}>
                <Node
                  path={`${path}.${key}`}
                  getPath={(path) => this.getTrueValue(`3.${path}`, doc)}
                >
                  {key}: {'{'}{this.renderSubJSON(value, indent + 1, `${path}.${key}`)}{'},'}
                </Node>
              </div>
            );
          } else {
            return (
              <div key={key + indent + 5}>
                <Node
                  path={`${path}.${key}`}
                  getPath={(path) => this.getTrueValue(`3.${path}`, doc)}
                >
                  {key}: {value},
                </Node>
              </div>
            );
          }
        }
      })
    }</div>
  }

  renderMainJSON(doc: object) {
    return <div style={{
      fontFamily: 'courier',
    }}>{'{'}
      {this.renderSubJSON(doc, 1, 'root')}
    {'}'}</div>
  }

  render() {
    const containerStyles: React.CSSProperties = {
      display: 'block',
    };

    const listItemStyles: React.CSSProperties = {
      border: 'solid',
      borderWidth: 1,
    };

    const { doc } = this.props;
    const { paths, drawers } = this.state;

    return this.renderMainJSON(doc);
  }
}

export default DiffViewComponent;
