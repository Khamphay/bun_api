import { UserInfor, UserInforModel, Users } from "../models/UserInforModel";

export default {
  getAllUserInfors: async (c, next) => {
    try {
      const user = new UserInforModel();
      const result = await user.getAllData();
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getUserInfor: async (c, next) => {
    try {
      const user = new UserInforModel();
      const result = await user.getUserInforByTokenUID(c.req.user?.uid ?? "");
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getUserInforByID: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const user = new UserInforModel();
      const result = await user.getOneDataByID(body.uid);
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createUserInfor: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: UserInfor = body;
      data.createdBy = c.req.user?.uid ?? "";
      const User = new UserInforModel(data);
      const result = await User.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateUserInfor: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: UserInfor = body;
      data.updatedBy = c.req.user?.uid ?? "";
      const user = new UserInforModel(data);
      const result = await user.updateData(data.uid ?? "");
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found User" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteUserInfor: async (c, next) => {
    try {
      const user = new UserInforModel();
      const result = await user.deleteData(c.req.param("uid"));

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found User" });
      }
    } catch (error) {
      next(error);
    }
  }
};
