import { client } from "../config/db";
import { CRUDModel } from "../interface/CRUD";
import { Districts } from "./DistrictModel";
import { Provinces } from "./ProvinceModel";

export interface Branches {
  id: number | null;
  companyId?: number | null;
  name: string | null;
  tel?: string | null;
  village: string | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  distrId: number | null;
  proId: number | null;
  provinces?: Provinces | null;
  districts?: Districts | null;
}

export class BrancheModel implements Branches, CRUDModel {
  id: number | null;
  companyId?: number | null;
  name: string | null;
  tel?: string | null;
  village: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  distrId: number | null;
  proId: number | null;

  constructor(data?: Branches | null) {
    this.id = data?.id ?? null;
    this.distrId = data?.distrId ?? null;
    this.companyId = data?.companyId ?? null;
    this.tel = data?.tel ?? null;
    this.proId = data?.proId ?? null;
    this.name = data?.name ?? null;
    this.village = data?.village ?? null;
    this.createdBy = data?.createdBy ?? null;
    this.updatedBy = data?.updatedBy ?? null;
  }

  public async getAllData(): Promise<Branches[] | Error> {
    try {
      const branch = await client.branches.findMany({
        include: { provinces: true, districts: true },
        where: { isDelete: false }
      });
      return branch;
    } catch (error) {
      throw error as Error;
    }
  }

  public async getOneDataByID(id: number): Promise<Branches | null | Error> {
    try {
      const branch = await client.branches.findUnique({
        include: { provinces: true, districts: true },
        where: { findOne: { id: id, isDelete: false } }
      });
      return branch;
    } catch (error) {
      throw error as Error;
    }
  }

  public async createData(): Promise<Branches | Error> {
    try {
      const branch = await client.branches.create({
        data: {
          name: this.name!,
          companyId: this.companyId,
          village: this.village!,
          distrId: this.distrId!,
          proId: this.proId!,
          tel: this.tel,
          createdBy: this.createdBy!
        }
      });
      return branch;
    } catch (error) {
      throw error as Error;
    }
  }

  public async updateData(id: number): Promise<Branches | null | Error> {
    try {
      const check = await client.branches.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check === null) return null;
      const branch = await client.branches.update({
        data: {
          name: this.name ?? check.name,
          companyId: this.companyId ?? check.companyId,
          village: this.village ?? check.village,
          distrId: this.distrId ?? check.distrId,
          proId: this.proId ?? check.proId,
          tel: this.tel ?? check.tel,
          updatedBy: this.updatedBy
        },
        where: { id: id }
      });
      return branch;
    } catch (error) {
      throw error as Error;
    }
  }

  public async deleteData(id: number): Promise<Branches | null | Error> {
    try {
      const check = await client.branches.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check === null) return null;
      const branch = await client.branches.delete({ where: { id: id } });
      return branch;
    } catch (error) {
      throw error as Error;
    }
  }
}
