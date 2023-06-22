import { client } from "../config/db";
import { CRUDModel } from "../interface/CRUD";
import { Districts } from "./DistrictModel";

export interface Provinces {
  id: number | null;
  name: string | null;
  region: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  distincts?: Districts[] | Districts | null;
}

export class ProvinceModel implements Provinces, CRUDModel {
  id: number | null;
  name: string | null;
  region: string | null;

  constructor(data?: Provinces | null) {
    this.id = data?.id !== undefined ? data.id : null;
    this.name = data?.name !== undefined ? data.name : null;
    this.region = data?.region !== undefined ? data.region : null;
  }

  public async getAllData(): Promise<Provinces[] | Error> {
    try {
      await client.$connect();
      let province: Provinces[] = await client.provinces.findMany({
        include: {
          districts: true
        }
      });
      return province;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }
  public async getOneDataByID(id: any): Promise<Provinces | null | Error> {
    try {
      await client.$connect();
      let province: Provinces | null = await client.provinces.findUnique({
        include: {
          districts: true
        },
        where: { id: id }
      });
      return province;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }
  public async createData(): Promise<Provinces | Error> {
    try {
      await client.$connect();
      let province = await client.provinces.create({
        data: {
          name: this.name,
          region: this.region
        }
      });
      return province;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }
  public async updateData(id: number): Promise<Provinces | null | Error> {
    try {
      await client.$connect();
      let data = await client.provinces.findUnique({
        where: { id: id }
      });
      if (data == null) return null;

      let province = await client.provinces.update({
        data: {
          name: this.name,
          region: this.region
        },
        where: {
          id: id
        }
      });
      return province;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }
  public async deleteData(id: any): Promise<Provinces | null | Error> {
    try {
      await client.$connect();
      let data = await client.provinces.findUnique({
        where: { id: id }
      });
      if (data == null) return null;

      let province = await client.provinces.delete({ where: { id: id } });
      return province;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }
}
