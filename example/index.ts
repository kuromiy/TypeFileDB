import path from "path";
import { IFConnection, Table, TypeFileDB } from "../src";
import { User } from "./User";

const main = async () => {
  const db: TypeFileDB = new TypeFileDB();
  const conn: IFConnection = await db.connection(path.join(__dirname, "../database/dev"));
  const userTable: Table<User> = conn.table(User);
  const insertUser1: User = new User();
  insertUser1._name = "test1";
  const insertUser2: User = new User();
  insertUser2._name = "test2";
  await userTable.insert(insertUser1);
  await userTable.insert(insertUser2);
  const userList: Array<User> = await userTable.find({});
  userList.forEach((user: User) => {
    // tslint:disable-next-line:no-console
    console.log(`${user._id} - ${user._name}`);
  });
};

main();
