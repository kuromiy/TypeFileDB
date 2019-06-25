import "reflect-metadata";
import { IColumnInformation } from "./IColumnInformation";

/**
 * 対象プロパティのクラス名をキーにして対象プロパティをリストに登録する
 * @param target
 * @param prop 対象プロパティ
 */
export const Column = (target: any, prop: string) => {
  const KEY = Symbol.for(target.constructor.name);
  const list: Array<IColumnInformation> = Reflect.getMetadata(KEY, target);
  if (list) {
    list.push({name: prop, type: "default"});
  } else {
    Reflect.defineMetadata(KEY, [{name: prop, type: "default"}], target);
  }
};
