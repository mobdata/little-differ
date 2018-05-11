import * as React from 'react';

interface ViewProps {
  document: object;
  height: number;
  width: number;
  backgroundColor: string;
}

class ViewComponent extends React.Component <ViewProps, {}> {
  constructor(props: ViewProps) {
    super(props);
  }

  constructList(document: object) {
    const ulStyles: React.CSSProperties = {
      listStyleType: 'circle',
      marginLeft: 10,
    };

    const liStyles: React.CSSProperties = {

    };

    return (
      <ul style={ulStyles}>{
        Object.keys(document).map((key) => {
          let value = document[key];
          if (value !== null && typeof value === 'object') {
            return (
              <li key={key} style={liStyles}>
                {`${key}: `}<ul>{this.constructList(value)}</ul>
              </li>
            );
          } else {
            return (
              <li key={key} style={liStyles}>
                {`${key}: ${value}`}
              </li>
            );
          }
        })
      }</ul>
    )
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
        {this.constructList(this.props.document)}
      </div>
    )
  }
}

export default ViewComponent;
