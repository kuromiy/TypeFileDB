import { IColumnInformation } from "./decorator/IColumnInformation";
import { Converter } from "./operator/Converter";
import { Deleter } from "./operator/Deleter";
import { Finder } from "./operator/Finder";
import { Updater } from "./operator/Updater";
import { DataStore } from "./store/DataStore";

type IMyConstructor<T> = new () => T;

// tslint:disable-next-line:ban-types
export class Table<T extends Object> {
  private _store: DataStore;

  constructor(store: DataStore, private _conn: IMyConstructor<T>) {
    this._store = store;
  }

  public find(query: any = {}, type: string = "or"): Promise<Array<T>> {
    return new Promise((resolve, reject) => {
      const dataList: Array<any> = this._store.datas;
      const finder: Finder = new Finder();
      const converter: Converter<T> = new Converter(this._conn);

      const findDataList = finder.find(dataList, query, type);
      const convertDataList = converter.converts(findDataList);

      resolve(convertDataList);
    });
  }

  public insert(newData: T): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const dataList: Array<any> = this._store.datas;
      const converter: Converter<T> = new Converter(this._conn);

      // AutoIncrement処理
      // TODO 別クラスに処理を移す
      const newDataObj = Object.assign(newData);
      // const newDataObj = Object.assign(this._conn);
      const properties: Array<IColumnInformation> = Reflect.getMetadata(Symbol.for(this._conn.name), this._conn.prototype);
      properties.forEach((property: IColumnInformation) => {
        if (property.type === "auto") {
          // dataListが空の時エラーが発生する
          if (dataList.length !== 0) {
            newDataObj[property.name] = dataList[dataList.length - 1][property.name] + 1;
          } else {
            newDataObj[property.name] = 1;
          }
        }
      });

      const reconvertData = converter.reconvert(newData);
      dataList.push(reconvertData);
      await this._store.save();
      resolve(newData);
    });
  }

  public update(query: any, updateQuery: any, type: string = "or"): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const dataList: Array<any> = this._store.datas;
      const finder: Finder = new Finder();
      const updater: Updater = new Updater();

      const findDataList = finder.find(dataList, query, type);
      updater.update(findDataList, updateQuery);
      await this._store.save();
      resolve(true);
    });
  }

  public delete(query: any, type: string = "or"): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const dataList: Array<any> = this._store.datas;
      const finder: Finder = new Finder();
      const deleter: Deleter = new Deleter();

      const findDataList = finder.find(dataList, query, type);
      deleter.delete(dataList, findDataList);
      await this._store.save();
      resolve();
    });
  }
}
