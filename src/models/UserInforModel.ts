import { client } from "../config/db";
import { userinformations_gender } from "@prisma/client";
import { CRUDModel } from "../interface/CRUD";
import { Roles } from "./RoleModel";
import { calculPage } from "../config/func";
import { Provinces } from "./ProvinceModel";
import { Villages } from "./VillageModel";
import { Districts } from "./DistrictModel";
import { userInfo } from "os";

export interface Users {
  uid?: string | null;
  roleId: number | null;
  userName: string | null;
  password: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  expired?: string | null;
  isDelete?: Boolean | null;
  createdBy: string | null;
  updatedBy?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  roles?: Roles | null;
}

export interface UserInfor {
  uid: string | null;
  proId: number | null;
  distId: number | null;
  villId: number | null;
  firstName: string | null;
  lastName: string | null;
  gender: userinformations_gender | null;
  birtday: Date | null;
  tel: string | null;
  status?: number | null;
  isDelete?: Boolean | null;
  createdBy: string | null;
  updatedBy?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  users?: Users | null;
  provinces?: Provinces | null;
  districts?: Districts | null;
  villages?: Villages | null;
}

export class UserInforModel implements UserInfor, CRUDModel {
  uid: string | null;
  proId: number | null;
  distId: number | null;
  villId: number | null;
  firstName: string | null;
  lastName: string | null;
  gender: userinformations_gender | null;
  birtday: Date | null;
  tel: string | null;
  status?: number | null;
  createdBy: string | null;
  updatedBy: string | null;
  users: Users | null;

  constructor(data?: UserInfor | null) {
    this.uid = data?.uid != (null || undefined) ? data.uid : null;
    this.proId = data?.proId != (null || undefined) ? data.proId : null;
    this.distId = data?.distId != (null || undefined) ? data.distId : null;
    this.villId = data?.villId != (null || undefined) ? data.villId : null;
    this.firstName = data?.firstName != undefined ? data.firstName : null;
    this.lastName = data?.lastName != undefined ? data.lastName : null;
    this.gender =
      data?.gender != undefined ? data.gender : userinformations_gender.male;
    this.birtday =
      data?.birtday != undefined
        ? new Date(data?.birtday)
        : new Date(new Date(Date.now()).getFullYear() - 10);
    this.tel = data?.tel != undefined ? data.tel : null;
    this.status = data?.status ?? null;
    this.createdBy = data?.createdBy != undefined ? data.createdBy : null;
    this.updatedBy = data?.updatedBy != undefined ? data.updatedBy : null;
    this.users = data?.users != undefined ? data?.users : null;
  }

  public async getAllData(
    page?: number,
    perPage?: number,
    totalPages?: number
  ): Promise<UserInfor[] | any | Error> {
    try {
      await client.$connect();
      if (totalPages === undefined) {
        const total = await client.userinformations.count({
          where: { isDelete: false }
        });
        totalPages = calculPage(total, perPage ?? 0);
      }
      const userifor: UserInfor[] | any =
        await client.userinformations.findMany({
          include: {
            users: {
              select: { uid: true, userName: true, roleId: true }
            },
            provinces: { select: { name: true, region: true } },
            districts: { select: { name: true } },
            villages: { select: { name: true } }
          },
          where: { status: 0, isDelete: false },
          skip: ((page ?? 1) - 1) * (perPage ?? 0),
          take: perPage
        });
      return {
        page: page,
        perPage: perPage,
        totalPages: totalPages,
        userifor: userifor
      };
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async getUserInforByTokenUID(uid: string): Promise<any | Error> {
    try {
      await client.$connect();
      const userifor: UserInfor | any =
        await client.userinformations.findUnique({
          include: {
            users: {
              include: {
                roles: { select: { name: true } }
              }
            },
            provinces: { select: { name: true, region: true } },
            districts: { select: { name: true } },
            villages: { select: { name: true } },
            employees: {
              include: { possitions: { select: { name: true } } }
            }
          },
          where: { uid: uid }
        });

      if (userifor != null && userifor.users != null) {
        let possition = undefined;
        if (
          userifor?.employees != null &&
          userifor.employees.userifor?.possitions != null
        )
          possition = userifor?.employees?.userifor?.possitions?.name;
        return {
          uid: userifor.uid,
          firstName: userifor.firstName,
          lastName: userifor.lastName,
          gender: userifor.gender,
          userName: userifor.users.userName,
          role: userifor.users.roles.name,
          province: userifor.provinces?.name ?? "",
          districts: userifor?.districts?.name ?? "",
          villages: userifor?.villages?.name ?? "",
          possition
        };
      } else return null;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async getOneDataByID(uid: string): Promise<UserInfor | any | Error> {
    try {
      await client.$connect();
      const userifor: UserInfor | any =
        await client.userinformations.findUnique({
          include: {
            users: {
              include: {
                roles: { select: { name: true } }
              }
            },
            provinces: { select: { name: true, region: true } },
            districts: { select: { name: true } },
            villages: { select: { name: true } }
          },
          where: { findOne: { uid: uid, status: 0, isDelete: false } }
        });

      if (userifor != null && userifor.users != null)
        userifor.users = this.filterUser(userifor.users);

      return userifor;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async createData(): Promise<UserInfor | any | Error> {
    try {
      await client.$connect();
      const role = await client.roles.findUnique({
        where: { id: this.users?.roleId ?? 1 }
      });
      if (role == null) throw { message: "No role found!" };
      const userifor: UserInfor | any = await client.userinformations.create({
        data: {
          proId: this.proId,
          distId: this.distId,
          villId: this.villId,
          firstName: this.firstName!,
          lastName: this.lastName ?? "",
          tel: this.tel ?? "",
          gender: this.gender!,
          birtday: this.birtday!,
          createdBy: this.createdBy ?? "",
          status: this.status ?? 0,
          users: {
            create: {
              userName: this.users?.userName ?? "",
              password: this.users?.password ?? "",
              createdBy: this.createdBy ?? "",
              roleId: this.users?.roleId ?? 2
            }
          }
        },
        include: {
          users: true
        }
      });

      return userifor;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async updateData(uid: string): Promise<UserInfor | null | Error> {
    try {
      await client.$connect();
      const rs = await client.userinformations.findUnique({
        where: { uid: uid }
      });
      if (rs == null) return null;

      const userifor: UserInfor = await client.userinformations.update({
        data: {
          firstName: this.firstName!,
          lastName: this.lastName ?? "",
          tel: this.tel ?? "",
          gender: this.gender!,
          birtday: this.birtday!,
          updatedBy: this.updatedBy ?? ""
        },
        where: { uid: uid }
      });
      return userifor;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async deleteData(uid: string): Promise<UserInfor | null | Error> {
    try {
      await client.$connect();
      const rs = await client.userinformations.findUnique({
        where: { uid: uid }
      });
      if (rs == null) return null;
      const userifor: UserInfor = await client.userinformations.delete({
        where: { uid: uid }
      });
      return userifor;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public filterUser(user: any) {
    try {
      if (user != null) {
        delete user["password"];
        delete user["accessToken"];
        delete user["refreshToken"];
        delete user["expired"];
      }
      return user;
    } catch (error) {
      return null;
    }
  }
}
