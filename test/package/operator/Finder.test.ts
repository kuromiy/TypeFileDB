import { Finder } from "../../../src/package/operator/Finder";

describe("Finder Test", () => {
  describe("Finder#preAnd", () => {
    it("", () => {
      const dataList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test03"},
      ];
      const expList: Array<any> = [
        {_id: 2, _name: "test02"},
      ];
      const queryPropery = "_id";
      const queryValue   = "2";
      const finder: Finder = new Finder();
      const resultList: Array<any> = finder.preAnd(dataList, queryPropery, queryValue);
      resultList.forEach((result: any, index: number) => {
        expect(result._id).toEqual(expList[index]._id);
        expect(result._name).toEqual(expList[index]._name);
      });
    });

    it("", () => {
      const dataList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test02"},
      ];
      const expList: Array<any> = [
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test02"},
      ];
      const queryPropery = "_name";
      const queryValue   = "test02";
      const finder: Finder = new Finder();
      const resultList: Array<any> = finder.preAnd(dataList, queryPropery, queryValue);
      resultList.forEach((result: any, index: number) => {
        expect(result._id).toEqual(expList[index]._id);
        expect(result._name).toEqual(expList[index]._name);
      });
    });
  });

  describe("Finder#and", () => {
    it("", () => {
      const finder: Finder = new Finder();
      const dataList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test02"},
        {_id: 4, _name: "test04"},
      ];
      const expList: Array<any> = [
        {_id: 2, _name: "test02"},
      ];
      const query: any = {_id: 2, _name: "test02"};
      const resultList: Array<any> = finder.and(dataList, query);
      resultList.forEach((result: any, index: number) => {
        expect(result._id).toEqual(expList[index]._id);
        expect(result._name).toEqual(expList[index]._name);
      });
    });
  });

  describe("Finder#or", () => {
    it("", () => {
      const finder: Finder = new Finder();
      const dataList: Array<any> = [
        {_id: 1, _name: "test01"},
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test02"},
        {_id: 4, _name: "test04"},
      ];
      const expList: Array<any> = [
        {_id: 2, _name: "test02"},
        {_id: 3, _name: "test02"},
      ];
      const query: any = {_name: "test02"};
      const resultList: Array<any> = finder.or(dataList, query);
      resultList.forEach((result: any, index: number) => {
        expect(result._id).toEqual(expList[index]._id);
        expect(result._name).toEqual(expList[index]._name);
      });
    });
  });
});
