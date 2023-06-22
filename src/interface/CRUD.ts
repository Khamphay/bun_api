export interface CRUDModel {
  getAllData(page: any, perPage: any, totalPages: number): Promise<any | Error>;
  getOneDataByID(id: any): Promise<any | null | Error>;
  createData(): Promise<any | Error>;
  updateData(id: any): Promise<any | Error>;
  deleteData(id: any): Promise<any | Error>;
}
