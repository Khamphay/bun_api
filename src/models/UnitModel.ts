import { CRUDModel } from "../interface/CRUD";
import { client, Prisma } from "../config/db";

export interface Units {
  id: number | null;
  name: string | null;
  price: number | null;
  isDelete?: Boolean | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class UnitModel implements Units, CRUDModel {
  id: number | null;
  name: string | null;
  price: number | null;
  createdBy: string | null;
  updatedBy: string | null;

  constructor(data?: Units | null) {
    this.id = data?.id != (null || undefined) ? data.id : null;
    this.name = data?.name != (null || undefined) ? data.name : null;
    this.price = data?.price != (null || undefined) ? data.price : null;
    this.createdBy =
      data?.createdBy != (null || undefined) ? data.createdBy : null;
    this.updatedBy =
      data?.updatedBy != (null || undefined) ? data.updatedBy : null;
  }

  public async getAllData(): Promise<Units[] | Error> {
    try {
      await client.$connect();
      let unit: Units[] = await client.units.findMany({
        where: { isDelete: false }
      });
      return unit;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async getOneDataByID(id: any): Promise<Units | null | Error> {
    try {
      await client.$connect();
      let unit: Units | null = await client.units.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      return unit;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async createData(): Promise<Units | Error> {
    try {
      await client.$connect();
      let unit: Units = await client.units.create({
        data: {
          name: this.name!,
          price: this.price!,
          createdBy: this.createdBy!
        }
      });
      return unit;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async updateData(id: number): Promise<Units | null | Error> {
    try {
      await client.$connect();
      let rs = await client.units.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (rs == null) return null;
      let unit: Units = await client.units.update({
        data: {
          name: this.name!,
          price: this.price!,
          updatedBy: this.updatedBy!
        },
        where: { id: id }
      });
      return unit;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async deleteData(id: any): Promise<Units | null | Error> {
    try {
      await client.$connect();
      let rs = await client.units.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (rs == null) return null;
      let unit: Units = await client.units.delete({
        where: { id: id }
      });
      return unit;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }
}
