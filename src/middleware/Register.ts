import { UserInfor, UserInforModel, Users } from "../models/UserInforModel";
import { client } from "../config/db";
import { checkPass, hashPass } from "../config/func";

export default {
  adminRegister: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const hasAdmin = await client.users.count({
        where: { roleId: body.roleId, isDelete: false }
      });
      if (hasAdmin > 0) {
        return c.json({ msg: "Admin has already!" });
      }

      if (body.password == null || !checkPass(body.password))
        return c.status(400).json({
          message:
            "password should contain atleast one number, one special character and length than 6 character."
        });

      const data: UserInfor = body;
      data.status = 1;
      const us: Users = {
        roleId: body.roleId,
        userName: body.userName,
        password: hashPass(body.password),
        createdBy: ""
      };
      data.users = us;
      data.createdBy = "";
      const user = new UserInforModel(data);
      const result = await user.createData();
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Register failed" });
      }
    } catch (error) {
      next(error);
    }
  },

  userRegister: async (c, next) => {
    try {
      const body = c.req.parseBody();
      if (body.password == null || !checkPass(body.password))
        return c.status(400).json({
          message:
            "password should contain atleast one number, one special character and length than 6 character."
        });
      const data: UserInfor = body;
      let us: Users = {
        roleId: body.roleId,
        userName: body.userName,
        password: hashPass(body.password),
        createdBy: ""
      };
      data.users = us;
      data.createdBy = "";
      const user = new UserInforModel(data);
      const result = await user.createData();
      c.status(201);
      return c.json(result);
    } catch (error) {
      next(error);
    }
  }
};
