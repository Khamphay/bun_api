import { client, Prisma } from "../config/db";
import { CRUDModel } from "../interface/CRUD";

export interface Roles {
  id: number | null;
  name: string | null;
  displayName?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class RoleModel implements Roles, CRUDModel {
  id: number | null;
  name: string | null;
  displayName?: string | null;

  constructor(data?: Roles | null) {
    this.id = data?.id != undefined ? data?.id : null;
    this.name = data?.name !== undefined ? data.name : null;
    this.displayName =
      data?.displayName != undefined ? data.displayName! : null;
  }

  public async getAllData(): Promise<Roles[] | null | Error> {
    try {
      await client.$connect();
      let role: Roles[] = await client.roles.findMany();
      return role;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async getOneDataByID(id: any): Promise<Roles | null | Error> {
    try {
      await client.$connect();
      let role: Roles | null = await client.roles.findUnique({
        where: { id: id }
      });
      return role;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }
  public async createData(): Promise<Roles | Error> {
    try {
      await client.$connect();
      let role: Roles = await client.roles.create({
        data: {
          name: this.name!,
          displayName: this.displayName
        }
      });

      return role;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async updateData(id: number): Promise<Roles | null | Error> {
    try {
      await client.$connect();
      let rs = await client.roles.findUnique({
        where: { id: id }
      });
      if (rs == null) return null;

      let role: Roles = await client.roles.update({
        data: {
          name: this.name!,
          displayName: this.displayName
        },
        where: { id: this.id! }
      });

      return role;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  deleteData(id: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
