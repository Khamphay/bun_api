import { merchants_status } from "@prisma/client";
import { CRUDModel } from "../interface/CRUD";
import { client } from "../config/db";
import { Provinces } from "./ProvinceModel";
import { Districts } from "./DistrictModel";

export interface Merchants {
  id: number | null;
  distrId: number | null;
  proId: number | null;
  uid: string | null;
  name: string | null;
  village: string | null;
  status: merchants_status | null;
  tel: string | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  provinces?: Provinces | null;
  districts?: Districts | null;
}

export class MerchantModel implements Merchants, CRUDModel {
  id: number | null;
  distrId: number | null;
  proId: number | null;
  uid: string | null;
  name: string | null;
  village: string | null;
  status: merchants_status | null;
  tel: string | null;
  createdBy: string | null;
  updatedBy: string | null;

  constructor(data?: Merchants | null) {
    this.id = data?.id ?? null;
    this.name = data?.name ?? null;
    this.proId = data?.proId ?? null;
    this.distrId = data?.distrId ?? null;
    this.uid = data?.uid ?? null;
    this.name = data?.name ?? null;
    this.village = data?.village ?? null;
    this.status = data?.status ?? merchants_status.pending;
    this.tel = data?.tel ?? null;
    this.createdBy = data?.createdBy ?? null;
    this.updatedBy = data?.updatedBy ?? null;
  }

  public async getAllData(): Promise<Merchants[] | Error> {
    try {
      const merchant: Merchants[] = await client.merchants.findMany({
        include: { provinces: true, districts: true },
        where: { isDelete: false }
      });
      return merchant;
    } catch (error) {
      throw error as Error;
    }
  }
  public async getOneDataByID(id: number): Promise<Merchants | null | Error> {
    try {
      const merchant = await client.merchants.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      return merchant;
    } catch (error) {
      throw error as Error;
    }
  }

  public async getMerchantByUID(uid: string): Promise<Merchants[] | Error> {
    try {
      const merchant = await client.merchants.findMany({
        where: { uid: uid, isDelete: false }
      });
      return merchant;
    } catch (error) {
      throw error as Error;
    }
  }

  public async createData(): Promise<Merchants | Error> {
    try {
      const merchant = await client.merchants.create({
        data: {
          proId: this.proId!,
          distrId: this.distrId!,
          name: this.name!,
          uid: this.uid ?? this.createdBy!,
          village: this.village!,
          tel: this.tel,
          createdBy: this.createdBy!
        }
      });
      return merchant;
    } catch (error) {
      throw error as Error;
    }
  }

  public async updateData(id: number): Promise<Merchants | null | Error> {
    try {
      const check = await client.merchants.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check == null) return null;
      const merchant = await client.merchants.update({
        data: {
          proId: this.proId ?? check.proId,
          distrId: this.distrId ?? check.distrId,
          name: this.name ?? check.name,
          uid: this.uid ?? check.uid,
          village: this.village ?? check.village,
          tel: this.tel ?? check.tel,
          status: this.status ?? check.status,
          updatedBy: this.updatedBy
        },
        where: { id: id }
      });
      return merchant;
    } catch (error) {
      throw error as Error;
    }
  }

  public async approveMerchants(
    id: number,
    updatedBy: string
  ): Promise<Merchants | null | Error> {
    try {
      const check = await client.merchants.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check == null) return null;
      const merchant = await client.merchants.update({
        data: {
          status: merchants_status.verified,
          updatedBy: updatedBy
        },
        where: { id: id }
      });
      return merchant;
    } catch (error) {
      throw error as Error;
    }
  }

  public async rejectMerchants(
    id: number,
    updatedBy: string
  ): Promise<Merchants | null | Error> {
    try {
      const check = await client.merchants.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check == null) return null;
      const merchant = await client.merchants.update({
        data: {
          status: merchants_status.rejected,
          updatedBy: updatedBy
        },
        where: { id: id }
      });
      return merchant;
    } catch (error) {
      throw error as Error;
    }
  }
  public async deleteData(id: any): Promise<Merchants | null | Error> {
    try {
      const check = await client.merchants.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check == null) return null;
      const merchant = await client.merchants.delete({ where: { id: id } });
      return merchant;
    } catch (error) {
      throw error as Error;
    }
  }
}
