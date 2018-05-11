/**
* @name app/header.ts
* @author Connor Bulakites
* @description This file defines the type interfaces for the App component,
* which can optionally accept arguments for both props and state.
*/

interface AppProps {
  documentA: object; // The first JSON document to be compared.
  documentB: object; // The second JSON document to be compared.
}

export default AppProps;
