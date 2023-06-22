import { EmployeeModel, Employees } from "../models/EmployeeModel";
import { UserInfor } from "../models/UserInforModel";
import { checkPass, hashPass } from "../config/func";

export default {
  getAllEmployees: async (c, next) => {
    try {
      const employee = new EmployeeModel();
      const result = await employee.getAllData(c.req.query("branchId"));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getEmployeeByID: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      const employee = new EmployeeModel();
      employee.branchId = body.branchId;
      const result = await employee.getOneDataByID(body.uid);
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createEmployee: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      if (body.password == null || !checkPass(body.password))
        return c.status(400).json({
          message:
            "password should contain atleast one number, one special character and length than 6 character."
        });

      const userInfor: UserInfor = {
        uid: null,
        proId: body.proId,
        distId: body.distId,
        villId: body.villId,
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        birtday: body.birtdays != null ? new Date(body.birtdays) : null,
        tel: body.tel,
        createdBy: c.c.req.user?.uid ?? "",
        users: {
          roleId: body.roleId,
          userName: body.userName,
          password: hashPass(body.password),
          createdBy: c.c.req.user?.uid ?? ""
        }
      };
      const data: Employees = {
        uid: null,
        branchId: body.branchId,
        possitionId: body.possitionId,
        tel: body.tel,
        createdBy: c.c.req.user?.uid ?? "",
        userinformations: userInfor
      };
      data.createdBy = c.c.req.user?.uid ?? "";
      const employee = new EmployeeModel(data);
      const result = await employee.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateEmployee: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      let user = null;
      if (
        body.roleId != null ||
        body.userName != null ||
        body.password != null
      ) {
        if (body.password != null && !checkPass(body.password))
          return c.status(400).json({
            message:
              "password should contain atleast one number, one special character and length than 6 character."
          });
        user = {
          roleId: body?.roleId ?? null,
          userName: body?.userName ?? null,
          password: body?.password != null ? hashPass(body.password) : null,
          createdBy: null,
          updatedBy: c.c.req.user?.uid ?? ""
        };
      }

      const userInfor: UserInfor = {
        uid: body.uid,
        proId: body.proId,
        distId: body.distId,
        villId: body.villId,
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        birtday: body.birtday != null ? new Date(body.birtday) : null,
        tel: body.tel,
        createdBy: null,
        users: user
      };
      const data: Employees = {
        uid: body.uid,
        branchId: body.branchId,
        possitionId: body.possitionId,
        tel: body.tel,
        createdBy: null,
        updatedBy: c.c.req.user?.uid ?? "",
        userinformations: userInfor
      };
      data.updatedBy = c.c.req.user?.uid ?? null;
      const employee = new EmployeeModel(data);
      const result = await employee.updateData(data.uid ?? "");
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Employee" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteEmployee: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      const employee = new EmployeeModel();
      employee.branchId = body.branchId;
      const result = await employee.deleteData(body.uid);

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Employee" });
      }
    } catch (error) {
      next(error);
    }
  }
};
