export class Updater {
  public update(dataList: Array<any>, updateQuery: any) {
    const updateQueryProperties = Object.keys(updateQuery);
    dataList.forEach((data: any) => {
      updateQueryProperties.forEach((property: any) => {
        if (data.hasOwnProperty(property)) {
          data[property] = updateQuery[property];
        }
      });
    });
  }
}
