import { Deleter } from "../../../src/package/operator/Deleter";
import { Finder } from "../../../src/package/operator/Finder";

describe("Deleter Test", () => {
  describe("Deleter#delete", () => {
    it("", () => {
      const dataList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test03"},
      ];
      const expList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 3, _name: "test03"},
      ];
      const query: any = {_name: "test02"};
      const deleter: Deleter = new Deleter();
      const finder: Finder = new Finder();
      const resultList: Array<any> = finder.find(dataList, query);
      deleter.delete(dataList, resultList);
      dataList.forEach((data: any, index: number) => {
        expect(data._id).toEqual(expList[index]._id);
        expect(data._name).toEqual(expList[index]._name);
      });
    });

    it("", () => {
      const dataList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test03"},
        {_id: 4, _name: "test02"},
        {_id: 5, _name: "test05"},
      ];
      const expList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 3, _name: "test03"},
        {_id: 5, _name: "test05"},
      ];
      const query: any = {_name: "test02"};
      const deleter: Deleter = new Deleter();
      const finder: Finder = new Finder();
      const resultList: Array<any> = finder.find(dataList, query);
      deleter.delete(dataList, resultList);
      dataList.forEach((data: any, index: number) => {
        expect(data._id).toEqual(expList[index]._id);
        expect(data._name).toEqual(expList[index]._name);
      });
    });

    it("", () => {
      const dataList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test02"},
        {_id: 4, _name: "test03"},
        {_id: 5, _name: "test02"},
        {_id: 6, _name: "test05"},
      ];
      const expList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 4, _name: "test03"},
        {_id: 6, _name: "test05"},
      ];
      const query: any = {_name: "test02"};
      const deleter: Deleter = new Deleter();
      const finder: Finder = new Finder();
      const resultList: Array<any> = finder.find(dataList, query);
      deleter.delete(dataList, resultList);
      dataList.forEach((data: any, index: number) => {
        expect(data._id).toEqual(expList[index]._id);
        expect(data._name).toEqual(expList[index]._name);
      });
    });
  });
});
