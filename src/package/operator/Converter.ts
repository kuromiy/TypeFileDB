import { IColumnInformation } from "../decorator/IColumnInformation";

type IMyConstructor<T> = new () => T;

// TODO Object型が使えない？
// tslint:disable-next-line:ban-types
export class Converter<T extends Object> {
  constructor(private _conn: IMyConstructor<T>) {}

  public converts(dataList: Array<any>): Array<T> {
    const result: Array<T> = new Array<T>();
    dataList.forEach((data: any) => {
      const con = this.convert(data);
      result.push(con);
    });
    return result;
  }

  public convert(data: any): T {
    const convertedData: T = new this._conn();
    const convertedMidData: any = Object.assign(convertedData);
    const properties: Array<IColumnInformation> = Reflect.getMetadata(Symbol.for(this._conn.name), this._conn.prototype);
    properties.forEach((property: IColumnInformation) => {
      convertedMidData[property.name] = data[property.name];
    });
    return convertedData;
  }

  // tslint:disable-next-line:ban-types
  public reconvert(target: T): any {
    const properties = Object.keys(target);
    const targetObj = Object.assign(target);
    // tslint:disable-next-line:ban-types
    const obj: Object = {};
    properties.forEach((property) => {
      Object.defineProperty(obj, property, {
        value: targetObj[property],
        writable: true,
        // tslint:disable-next-line:object-literal-sort-keys
        configurable: true,
        enumerable: true,
      });
    });
    return obj;
  }
}
