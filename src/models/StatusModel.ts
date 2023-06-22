import { client } from "../config/db";
import { CRUDModel } from "../interface/CRUD";

export interface Status {
  id: number | null;
  statusName: string | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class StatusModel implements Status, CRUDModel {
  id: number | null;
  statusName: string | null;
  createdBy: string | null;
  updatedBy: string | null;

  constructor(data?: Status) {
    this.id = data?.id ?? null;
    this.statusName = data?.statusName ?? null;
    this.createdBy = data?.createdBy ?? null;
    this.updatedBy = data?.updatedBy ?? null;
  }

  public async getAllData(): Promise<Status[] | Error> {
    try {
      const stt: Status[] = await client.status.findMany({
        where: { isDelete: false }
      });
      return stt;
    } catch (error) {
      throw error as Error;
    }
  }
  public async getOneDataByID(id: number): Promise<Status | null | Error> {
    try {
      const stt = await client.status.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      return stt;
    } catch (error) {
      throw error as Error;
    }
  }
  public async createData(): Promise<any> {
    try {
      const stt = await client.status.create({
        data: {
          statusName: this.statusName!,
          createdBy: this.createdBy!
        }
      });
      return stt;
    } catch (error) {
      throw error as Error;
    }
  }
  public async updateData(id: number): Promise<Status | null | Error> {
    try {
      const check = await client.status.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check === null) return null;
      const stt = await client.status.update({
        data: {
          statusName: this.statusName ?? check.statusName,
          updatedBy: this.updatedBy
        },
        where: { id: id }
      });
      return stt;
    } catch (error) {
      throw error as Error;
    }
  }
  public async deleteData(id: number): Promise<any> {
    try {
      const check = await client.status.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check === null) return null;
      const stt = await client.status.delete({ where: { id: id } });
      return stt;
    } catch (error) {
      throw error as Error;
    }
  }
}
