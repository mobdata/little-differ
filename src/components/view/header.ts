/**
* @name view/header.ts
* @author Connor Bulakites
* @description This file defines the type interfaces for the View component,
* which can optionally accept arguments for both props and state.
*/

interface ViewProps {
  document: object; // The JSON document to be displayed as a list
  height: number; // The height of the container div element
  width: number; // The width of the container div element
  backgroundColor: string; // The background color of the container div element
}

export default ViewProps;
