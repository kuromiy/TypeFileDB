export class Finder {
  public find(dataList: Array<any>, query: any, type: string = "or"): Array<any> {
    if (Object.keys(query).length === 0) return dataList;
    let result: Array<any> = new Array<any>();
    if (type === "or") {
      result = this.or(dataList, query);
    } else if (type === "and") {
      result = this.and(dataList, query);
    }
    return result;
  }

  public or(dataList: Array<any>, query: any): Array<any> {
    const findResult: Array<any> = new Array<any>();
    const queryProperties: Array<string> = Object.keys(query);
    queryProperties.forEach((query_property: string) => {
      dataList.forEach((data: any) => {
        if (data.hasOwnProperty(query_property)) {
          if (data[query_property] === query[query_property]) findResult.push(data);
        }
      });
    });
    const set = new Set(findResult);
    return Array.from(set);
  }

  public and(dataList: Array<any>, query: any): Array<any> {
    let findResult: Array<any> = dataList;
    const queryProperties: Array<string> = Object.keys(query);
    queryProperties.forEach((query_property: any) => {
      findResult = this.preAnd(findResult, query_property, query[query_property]);
    });
    return findResult;
  }

  public preAnd(dataList: Array<any>, query_property: any, query_value: any) {
    const findResult: Array<any> = new Array<any>();
    dataList.forEach((data: any) => {
      if (data.hasOwnProperty(query_property)) {
        if (data[query_property] === query_value) findResult.push(data);
      }
    });
    return findResult;
  }
}
