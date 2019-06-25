import "reflect-metadata";
import { IColumnInformation } from "./IColumnInformation";

/**
 * 対象プロパティのクラス名をキーにして対象プロパティをリストに登録する
 * @param target
 * @param prop 対象プロパティ
 */
export const AutoIncrementColumn = (target: any, prop: string) => {
  const KEY = Symbol.for(target.constructor.name);
  const list: Array<IColumnInformation> = Reflect.getMetadata(KEY, target);
  if (list) {
    list.push({name: prop, type: "auto"});
  } else {
    Reflect.defineMetadata(KEY, [{name: prop, type: "auto"}], target);
  }
};
