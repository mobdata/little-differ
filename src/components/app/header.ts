/**
* @name app/header.ts
* @author Connor Bulakites
* @description This file defines the type interfaces for the App component,
* which can optionally accept arguments for both props and state.
*/

export interface AppProps {
  docA: object; // The first JSON document to be compared.
  docB: object; // The second JSON document to be compared.
}

export interface AppState {
  newDoc: object; // The new JSON document to be constructed.
}
