import { Connection } from "./Connection";
import { IFConnection } from "./IFConnection";

export class TypeFileDB {
  public connection(dbDirPath: string): Promise<IFConnection> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn: Connection = new Connection(dbDirPath);
        const result: boolean = await conn.init();
        return resolve(conn);
      } catch (err) {
        return reject(err);
      }
    });
  }
}
