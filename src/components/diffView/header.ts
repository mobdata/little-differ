/**
* @name diffView/header.ts
* @author Connor Bulakites
* @description This file defines the type interfaces for the DiffView component,
* which can optionally accept arguments for both props and state. There is also
* the Path interface, which defines an object containing metadata regarding the
* paths to unique values within a JSON document.
*/

export interface DiffViewProps {
  doc: object // The JSON document to be displayed as a list
  height: number // The height of the container div element
  width: number // The width of the container div element
  backgroundColor: string // The background color of the container div element
  addPair: Function
}

export default DiffViewProps
