import { client } from "../config/db";
import { calculPage } from "../config/func";
import { CRUDModel } from "../interface/CRUD";
import { Villages } from "./VillageModel";

export interface Districts {
  id: number | null;
  proId: number | null;
  name: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  villages?: Villages[] | null;
}

export class DistrictModel implements Districts, CRUDModel {
  id: number | null;
  proId: number | null;
  name: string | null;
  villages?: Villages[] | null;

  constructor(data?: Districts | null) {
    this.id = data?.id ?? null;
    this.name = data?.name ?? null;
    this.proId = data?.proId ?? null;
  }

  public async getAllData(
    page: number,
    perPage: number,
    totalPages: number
  ): Promise<any> {
    try {
      if (totalPages == undefined) {
        const total = await client.districts.count();
        totalPages = calculPage(total, page);
      }
      const district = await client.districts.findMany({
        skip: ((page ?? 1) - 1) * (perPage ?? 0),
        take: perPage
      });
      return { page, perPage, totalPages, district };
    } catch (error) {
      throw error as Error;
    }
  }

  public async getDistrictByProID(proId: number): Promise<any> {
    try {
      const district = await client.districts.findMany({
        where: { proId: proId }
      });
      return district;
    } catch (error) {
      throw error as Error;
    }
  }

  public async getOneDataByID(id: number): Promise<any> {
    try {
      const district = await client.districts.findUnique({ where: { id: id } });
      return district;
    } catch (error) {
      throw error as Error;
    }
  }

  public async createData(): Promise<any> {
    try {
      const district = await client.districts.create({
        data: {
          name: this.name!,
          proId: this.proId!
        }
      });
      return district;
    } catch (error) {
      throw error as Error;
    }
  }
  public async updateData(id: number): Promise<any> {
    try {
      const check = await client.districts.findUnique({
        where: { id: id }
      });
      if (check == null) return null;
      const district = await client.districts.update({
        data: {
          name: this.name!,
          proId: this.proId ?? check.proId
        },
        where: { id: id }
      });
      return district;
    } catch (error) {
      throw error as Error;
    }
  }
  public async deleteData(id: number): Promise<any> {
    try {
      const check = await client.districts.findUnique({
        where: { id: id }
      });
      if (check == null) return null;
      const district = await client.districts.delete({ where: { id: id } });
      return district;
    } catch (error) {
      throw error as Error;
    }
  }
}
