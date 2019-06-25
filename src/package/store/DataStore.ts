import fs from "fs";

export class DataStore {
  /**
   * テーブルファイルの実データ
   */
  private _datas: Array<any>;
  /**
   * テーブルファイルパス
   */
  private _tableFilePath: string;

  /**
   * 対象テーブルファイルパスを設定して初期化します。
   * @param tableFilePath 対象テーブルファイルパス
   */
  constructor(tableFilePath: string) {
    this._datas = new Array<any>();
    this._tableFilePath = tableFilePath;
  }

  /**
   * テーブルファイルパスに対応したテーブルファイルから読み込んだデータの変換を行い保持します。
   * テーブルファイルパスに対応したテーブルファイルが存在しない場合、テーブルファイルを新規作成します。
   * 上記いずれかの処理が完了したらtrueを返します。
   * 読込エラーが発生した場合、例外を投げます。
   */
  public load(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const isExists = await fs.existsSync(this._tableFilePath);
        if (isExists) {
          const readData: string = await fs.readFileSync(this._tableFilePath, {encoding: "utf-8"});
          // TODO JSON変換に失敗した場合どうするか
          try {
            this._datas = JSON.parse(readData);
          } catch (jsonError) {
            // JSON変換エラー時処理
            this._datas = new Array<any>();
          }
        } else {
          await fs.writeFileSync(this._tableFilePath, "", {encoding: "utf-8"});
        }
        return resolve(true);
      } catch (err) {
        return reject(err);
      }
    });
  }

  /**
   * テーブルファイルに実データを書き込みます。
   * 処理が完了したらを返します。
   * 書込エラーが発生した場合、例外を投げます。
   */
  public save(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        // TODO JSON変換に失敗した場合どうするか
        await fs.writeFileSync(this._tableFilePath, JSON.stringify(this._datas), {encoding: "utf-8"});
        return resolve(true);
      } catch (err) {
        return reject(err);
      }
    });
  }

  /**
   * テーブルファイルの実データを返します。
   */
  public get datas(): Array<any> {
    return this._datas;
  }
}
