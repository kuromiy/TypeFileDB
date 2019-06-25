import { Table } from "./Table";

export interface IFConnection {
  table<T>(model: new () => T): Table<T>;
}
