import { client } from "../config/db";
import { CRUDModel } from "../interface/CRUD";

export interface Zones {
  id: number | null;
  zoneName: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class ZoneModel implements Zones, CRUDModel {
  id: number | null;
  zoneName: string | null;
  isDelete?: boolean | undefined;
  createdBy: string | null;
  updatedBy: string | null;

  constructor(data?: Zones | null) {
    this.id = data?.id ?? null;
    this.zoneName = data?.zoneName ?? null;
    this.createdBy = data?.createdBy ?? null;
    this.updatedBy = data?.updatedBy ?? null;
  }

  public async getAllData(): Promise<Zones[] | Error> {
    try {
      let zone: Zones[] = await client.zones.findMany({
        where: { isDelete: false }
      });
      return zone;
    } catch (error) {
      throw error as Error;
    }
  }
  public async getOneDataByID(id: number): Promise<Zones | null | Error> {
    try {
      let zone: Zones | null = await client.zones.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      return zone;
    } catch (error) {
      throw error as Error;
    }
  }
  public async createData(): Promise<Zones | Error> {
    try {
      let zone = await client.zones.create({
        data: {
          zoneName: this.zoneName!,
          createdBy: this.createdBy!
        }
      });

      return zone;
    } catch (error) {
      throw error as Error;
    }
  }
  public async updateData(id: number): Promise<Zones | null | Error> {
    try {
      let check = await client.zones.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check === null) return null;
      let zone = await client.zones.update({
        data: {
          zoneName: this.zoneName!,
          updatedBy: this.updatedBy
        },
        where: { id: id }
      });
      return zone;
    } catch (error) {
      throw error as Error;
    }
  }
  public async deleteData(id: any): Promise<Zones | null | Error> {
    try {
      let check = await client.zones.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check === null) return null;
      let zone = await client.zones.delete({
        where: { id: id }
      });
      return zone;
    } catch (error) {
      throw error as Error;
    }
  }
}
