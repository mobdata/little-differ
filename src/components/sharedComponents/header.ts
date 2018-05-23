/**
* @name sharedComponents/header.ts
* @author Connor Bulakites
* @description Type definitions for shared components.
*/

export interface Path {
  path: string; // The path to a unique value within a JSON document
  drawer: boolean; // Does this value link to an object containing more values?
}
