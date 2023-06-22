import { client } from "../config/db";
import { CRUDModel } from "../interface/CRUD";

export interface Possitions {
  id: number | null;
  name: string | null;
  isDelete?: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class PossitionModel implements Possitions, CRUDModel {
  id: number | null;
  name: string | null;
  createdBy: string | null;
  updatedBy: string | null;

  constructor(data?: Possitions | null) {
    this.id = data?.id ?? null;
    this.name = data?.name ?? null;
    this.createdBy = data?.createdBy ?? null;
    this.updatedBy = data?.updatedBy ?? null;
  }

  public async getAllData(): Promise<any> {
    try {
      const possition: Possitions[] = await client.possitions.findMany({
        where: { isDelete: false }
      });
      return possition;
    } catch (error) {
      throw error as Error;
    }
  }
  public async getOneDataByID(id: number): Promise<Possitions | null | Error> {
    try {
      const possition: Possitions | null = await client.possitions.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      return possition;
    } catch (error) {
      throw error as Error;
    }
  }
  public async createData(): Promise<Possitions | null | Error> {
    try {
      const possition = await client.possitions.create({
        data: {
          name: this.name!,
          createdBy: this.createdBy!
        }
      });
      return possition;
    } catch (error) {
      throw error as Error;
    }
  }
  public async updateData(id: any): Promise<Possitions | null | Error> {
    try {
      const check = await client.possitions.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check == null) return null;
      const possition = await client.possitions.update({
        data: { name: this.name ?? check.name, updatedBy: this.createdBy },
        where: { id: id }
      });
      return possition;
    } catch (error) {
      throw error as Error;
    }
  }
  public async deleteData(id: number): Promise<Possitions | null | Error> {
    try {
      const check = await client.possitions.findUnique({
        where: { findOne: { id: id, isDelete: false } }
      });
      if (check == null) return null;
      const possition = await client.possitions.delete({
        where: { id: id }
      });
      return possition;
    } catch (error) {
      throw error as Error;
    }
  }
}
