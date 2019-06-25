export class Deleter {
  public delete(dataList: Array<any>, targetDataList: Array<any>) {
    targetDataList.forEach((target: any) => {
      dataList.forEach((data: any, index: number) => {
        if (target._id === data._id) dataList.splice(index, 1);
      });
    });
  }
}
