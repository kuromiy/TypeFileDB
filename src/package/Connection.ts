import fsExtra from "fs-extra";
import { IFConnection } from "./IFConnection";
import { DataStore } from "./store/DataStore";
import { StoreManager } from "./store/StoreManager";
import { Table } from "./Table";

export class Connection implements IFConnection {
  private _storeManager: StoreManager;
  private _dbDirPath: string;

  constructor(dbDirPath: string) {
    this._storeManager = new StoreManager(dbDirPath);
    this._dbDirPath = dbDirPath;
  }

  public init(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        // TODO ディレクトリの存在有無、権利調整
        await fsExtra.mkdirpSync(this._dbDirPath);
        const result: boolean = await this._storeManager.loadStore();
        return resolve(result);
      } catch (err) {
        return reject(err);
      }
    });
  }

  public table<T>(model: new () => T): Table<T> {
    const store: DataStore = this._storeManager.store(model);
    return new Table<T>(store, model);
  }
}
