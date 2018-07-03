/**
* @name diffView/header.ts
* @author Connor Bulakites
* @description This file defines the type interfaces for the DiffView component,
* which can optionally accept arguments for both props and state. There is also
* the Path interface, which defines an object containing metadata regarding the
* paths to unique values within a JSON document.
*/

export interface Path {
  path: string; // The path to a unique value within a JSON document
  drawer: boolean; // Does this value link to an object containing more values?
}

export interface DiffViewProps {
  diffData: object; // The JSON document to be displayed as a list
  height: number; // The height of the container div element
  width: number; // The width of the container div element
  backgroundColor: string; // The background color of the container div element
  addPair: Function;
}

export interface DiffViewState {
  paths: Array<Path>; // All of the paths to unique values within the document
  drawers: object; // The status of whether drawers in the UI are open or not
}
