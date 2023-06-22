import { client } from "../config/db";
import { calculPage } from "../config/func";
import { CRUDModel } from "../interface/CRUD";
import { Zones } from "./ZoneModel";

export interface Villages {
  id: number | null;
  zoneId: number | null;
  distId: number | null;
  name: string | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  zones?: Zones | null;
}

export class VillageModel implements Villages, CRUDModel {
  id: number | null;
  zoneId: number | null;
  distId: number | null;
  name: string | null;
  createdBy: string | null;
  updatedBy: string | null;

  constructor(data?: Villages | null) {
    this.id = data?.id ?? null;
    this.zoneId = data?.zoneId ?? null;
    this.distId = data?.distId ?? null;
    this.name = data?.name ?? null;
    this.createdBy = data?.createdBy ?? null;
    this.updatedBy = data?.updatedBy ?? null;
  }

  public async getAllData(
    page: number,
    perPage: number,
    totalPages?: number
  ): Promise<any> {
    try {
      if (totalPages === undefined) {
        const total = await client.villages.count({
          where: { isDelete: false }
        });
        totalPages = calculPage(total, perPage);
      }
      const village = await client.villages.findMany({
        include: { zones: true },
        where: { isDelete: false },
        skip: ((page ?? 1) - 1) * (perPage ?? 0),
        take: perPage
      });
      return { page, perPage, totalPages, villages: village };
    } catch (error) {
      throw error as Error;
    }
  }

  public async getVillageByDistID(distId: number): Promise<Villages[] | Error> {
    try {
      const village: Villages[] = await client.villages.findMany({
        include: { zones: true },
        where: { distId: distId, isDelete: false }
      });
      return village;
    } catch (error) {
      throw error as Error;
    }
  }

  public async getOneDataByID(id: number): Promise<Villages | null | Error> {
    try {
      const village: Villages | null = await client.villages.findUnique({
        include: { zones: true },
        where: { findOne: { id: id, isDelete: false } }
      });
      return village;
    } catch (error) {
      throw error as Error;
    }
  }

  public async createData(): Promise<Villages | Error> {
    try {
      const village = await client.villages.create({
        data: {
          name: this.name!,
          distId: this.distId!,
          zoneId: this.zoneId!,
          createdBy: this.createdBy!
        }
      });
      return village;
    } catch (error) {
      throw error as Error;
    }
  }

  public async updateData(id: number): Promise<Villages | null | Error> {
    try {
      const check = await client.villages.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check === null) return null;
      const village = await client.villages.update({
        data: {
          name: this.name!,
          distId: this.distId ?? check.distId,
          zoneId: this.zoneId ?? check.zoneId,
          updatedBy: this.updatedBy!
        },
        where: {
          id: id
        }
      });
      return village;
    } catch (error) {
      throw error as Error;
    }
  }

  public async deleteData(id: any): Promise<any> {
    try {
      const check = await client.villages.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check === null) return null;
      const village = await client.villages.delete({ where: { id: id } });
      return village;
    } catch (error) {
      throw error as Error;
    }
  }
}
