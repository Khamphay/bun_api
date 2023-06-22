import { client } from "../config/db";
import { CRUDModel } from "../interface/CRUD";
import { UserInfor } from "./UserInforModel";

export interface Employees {
  uid: string | null;
  branchId: number | null;
  possitionId: number | null;
  tel: string | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  userinformations?: UserInfor | null;
}

export class EmployeeModel implements Employees, CRUDModel {
  uid: string | null;
  branchId: number | null;
  possitionId: number | null;
  tel: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  userinformations: UserInfor | null;

  constructor(data?: Employees | null) {
    this.uid = data?.uid ?? null;
    this.branchId = data?.branchId ?? null;
    this.possitionId = data?.possitionId ?? null;
    this.tel = data?.tel ?? null;
    this.createdBy = data?.createdBy ?? null;
    this.updatedBy = data?.updatedBy ?? null;
    this.userinformations = data?.userinformations ?? null;
  }

  public async getAllData(branchId: any): Promise<any> {
    try {
      let employee: any;
      if (branchId == null) {
        employee = await client.employees.findMany({
          include: {
            userinformations: {
              include: {
                provinces: { select: { id: true, name: true } },
                districts: { select: { id: true, name: true } },
                villages: { select: { id: true, name: true } }
              }
            },
            branches: { select: { id: true, name: true } },
            possitions: { select: { id: true, name: true } }
          },
          where: { isDelete: false }
        });
      } else
        employee = await client.employees.findMany({
          include: {
            userinformations: {
              include: {
                provinces: { select: { id: true, name: true } },
                districts: { select: { id: true, name: true } },
                villages: { select: { id: true, name: true } }
              }
            },
            branches: { select: { id: true, name: true } },
            possitions: { select: { id: true, name: true } }
          },
          where: { branchId: branchId, isDelete: false }
        });
      return employee;
    } catch (error) {
      throw error as Error;
    }
  }

  public async getOneDataByID(uid: string): Promise<any | null> {
    try {
      const employee = await client.employees.findUnique({
        include: {
          userinformations: {
            include: {
              provinces: { select: { name: true } },
              districts: { select: { name: true } },
              villages: { select: { name: true } }
            }
          },
          branches: { select: { name: true } },
          possitions: { select: { name: true } }
        },
        where: {
          findOne: { uid: uid, branchId: this.branchId!, isDelete: false }
        }
      });
      return employee;
    } catch (error) {
      throw error as Error;
    }
  }

  public async createData(): Promise<any> {
    try {
      const employee: UserInfor | any = await client.userinformations.create({
        data: {
          proId: this.userinformations!.proId,
          distId: this.userinformations!.distId,
          villId: this.userinformations!.villId,
          firstName: this.userinformations!.firstName!,
          lastName: this.userinformations!.lastName ?? "",
          tel: this.tel ?? "",
          gender: this.userinformations!.gender!,
          birtday: this.userinformations!.birtday!,
          createdBy: this.createdBy ?? "",
          status: 1,
          employees: {
            create: {
              branchId: this.branchId!,
              possitionId: this.possitionId!,
              tel: this.tel!,
              createdBy: this.createdBy!
            }
          },
          users: {
            create: {
              userName: this.userinformations!.users?.userName ?? "",
              password: this.userinformations!.users?.password ?? "",
              createdBy: this.createdBy ?? "",
              roleId: this.userinformations!.users?.roleId ?? 2
            }
          }
        },
        include: {
          employees: true,
          users: true
        }
      });

      return employee;
    } catch (error) {
      throw error as Error;
    }
  }

  public async updateData(uid: string): Promise<any> {
    try {
      const check = await client.employees.findUnique({
        include: { userinformations: { include: { users: true } } },
        where: {
          findOne: { uid: uid, branchId: this.branchId!, isDelete: false }
        }
      });
      if (check == null) return null;
      if (this.userinformations == null)
        this.userinformations = check.userinformations;
      if (this.userinformations.firstName == null)
        this.userinformations.firstName = check.userinformations.firstName;
      if (this.userinformations.lastName == null)
        this.userinformations.lastName = check.userinformations.lastName;
      if (this.userinformations.gender == null)
        this.userinformations.gender = check.userinformations.gender;
      if (this.userinformations.birtday == null)
        this.userinformations.birtday = check.userinformations.birtday;
      if (this.userinformations.proId == null)
        this.userinformations.proId = check.userinformations.proId;
      if (this.userinformations.distId == null)
        this.userinformations.distId = check.userinformations.distId;
      if (this.userinformations.villId == null)
        this.userinformations.villId = check.userinformations.villId;

      if (this.userinformations.users != null)
        await client.users.update({
          data: {
            roleId:
              this.userinformations.users?.roleId ??
              check.userinformations.users?.roleId,
            userName:
              this.userinformations.users?.userName ??
              check.userinformations.users?.userName,
            password:
              this.userinformations?.users?.password ??
              check.userinformations.users?.password,
            updatedBy: this.updatedBy
          },
          where: { uid: uid }
        });

      const employee = await client.$transaction([
        client.userinformations.update({
          data: {
            proId: this.userinformations!.proId,
            distId: this.userinformations!.distId,
            villId: this.userinformations!.villId,
            firstName: this.userinformations!.firstName!,
            lastName: this.userinformations!.lastName ?? "",
            tel: this.tel ?? "",
            gender: this.userinformations!.gender!,
            birtday: this.userinformations!.birtday!,
            updatedBy: this.updatedBy ?? ""
          },
          where: { uid: uid }
        }),

        client.employees.update({
          data: {
            branchId: this.branchId ?? check.branchId,
            possitionId: this.possitionId ?? check.possitionId,
            tel: this.tel!,
            updatedBy: this.updatedBy
          },
          where: { uid: uid }
        })
      ]);

      return employee[0];
    } catch (error) {
      throw error as Error;
    }
  }

  public async deleteData(uid: string): Promise<any> {
    try {
      const check = await client.employees.findUnique({
        where: {
          findOne: { uid: uid, branchId: this.branchId!, isDelete: false }
        }
      });
      const employee = await client.$transaction([
        client.userinformations.delete({
          where: { uid: uid }
        }),

        client.employees.delete({
          where: { uid: uid }
        })
      ]);
      return employee[0];
    } catch (error) {
      throw error as Error;
    }
  }
}
