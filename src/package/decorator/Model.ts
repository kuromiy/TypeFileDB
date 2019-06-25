import "reflect-metadata";
import { StoreManager } from "../store/StoreManager";
import { KEYS } from "./Keys";

/**
 * クラス名をキーにしてリストに登録する
 * 登録したクラス名を使用してStoreManagerでテーブルを読み込む
 * @param fnc
 */
// tslint:disable-next-line:ban-types
export const Model = (fnc: Function) => {
  const list = Reflect.getMetadata(KEYS.Model, StoreManager);
  if (list) {
    list.push(fnc.name);
  } else {
    Reflect.defineMetadata(KEYS.Model, [fnc.name], StoreManager);
  }
};
