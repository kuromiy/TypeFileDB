import "reflect-metadata";
import { KEYS } from "../decorator/Keys";
import { DataStore } from "./DataStore";

export class StoreManager {
  /**
   * データベースディレクトリパス
   */
  private _dbDirPath: string;
  private _storeMap: Map<string, DataStore>;

  constructor(dbDirPath: string) {
    this._dbDirPath = dbDirPath;
    this._storeMap = new Map<string, DataStore>();
  }

  /**
   * Modelデコレータで登録したテーブル情報を取り出してDataStoreを生成する
   */
  public loadStore(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const tableNameList = Reflect.getMetadata(KEYS.Model, StoreManager);
        for (const tableName of tableNameList) {
          const dataStore = new DataStore(`${this._dbDirPath}/${tableName}.json`);
          const result: boolean = await dataStore.load();
          this._storeMap.set(tableName, dataStore);
        }
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * 対応したDataStoreを取り出す
   * @param target 取り出したいテーブルのクラス
   */
  public store<T>(target: new () => T): DataStore {
    const dataStore = this._storeMap.get(target.name);
    if (!dataStore) throw new Error("No DataStore");
    return dataStore;
  }
}
