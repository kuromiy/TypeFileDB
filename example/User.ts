import { Column, Model } from "../src";
import { AutoIncrementColumn } from "../src/package/decorator/AutoIncrementColumn";

@Model
export class User {
  @AutoIncrementColumn public _id!: number;
  @Column public _name!: string;
}
