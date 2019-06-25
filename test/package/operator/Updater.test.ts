import { Updater } from "../../../src/package/operator/Updater";

describe("Updater", () => {
  describe("Updater#update", () => {
    it("", () => {
      const dataList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test03"},
      ];
      const expList: Array<any> = [
        {_id: 1, _name: "updateTest"},
        {_id: 2, _name: "updateTest"},
        {_id: 3, _name: "updateTest"},
      ];
      const updateQuery = {_name: "updateTest"};
      const updater: Updater = new Updater();
      updater.update(dataList, updateQuery);
      dataList.forEach((data: any, index: number) => {
        expect(data._id).toEqual(expList[index]._id);
        expect(data._name).toEqual(expList[index]._name);
      });
    });
  });
});
