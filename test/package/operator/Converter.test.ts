import { Column, Model } from "../../../src";
import { Converter } from "../../../src/package/operator/Converter";

@Model
class User {
  @Column public _id!: number;
  @Column public _name!: string;
}

describe("Converter Test", () => {
  describe("Converter#convert", () => {
    it("", () => {
      const converter: Converter<User> = new Converter(User);
      const data: any = {
        _id: 1,
        _name: "daiki",
      };
      const user: User = converter.convert(data);
      expect(user instanceof User).toBeTruthy();
      expect(user._id).toEqual(data._id);
      expect(user._name).toEqual(data._name);
    });
  });

  describe("Converter#converts", () => {
    it("", () => {
      const converter: Converter<User> = new Converter(User);
      const dataList: Array<any> = [
        {_id: 1, _name: "test1"},
        {_id: 2, _name: "test2"},
      ];
      const userList: Array<User> = converter.converts(dataList);
      userList.forEach((user: User, index: number) => {
        expect(user instanceof User).toBeTruthy();
        expect(user._id).toEqual(dataList[index]._id);
        expect(user._name).toEqual(dataList[index]._name);
      });
    });
  });

  describe("Converter#reconvert", () => {
    it("", () => {
      const converter: Converter<User> = new Converter(User);
      const user: User = new User();
      user._id = 1;
      user._name = "test1";
      const data = converter.reconvert(user);
      expect(data instanceof Object).toBeTruthy();
      expect(data._id).toEqual(user._id);
      expect(data._name).toEqual(user._name);
    });
  });
});
