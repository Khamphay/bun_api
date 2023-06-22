import { RoleModel, Roles } from "../models/RoleModel";

export default {
  getAllRoles: async (c, next) => {
    try {
      const role = new RoleModel();
      let result = await role.getAllData();
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getRoleByID: async (c, next) => {
    try {
      const role = new RoleModel();
      let result = await role.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createRole: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Roles = body;
      const role = new RoleModel(data);
      let result = await role.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateRole: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Roles = body;
      const role = new RoleModel(data);
      let result = await role.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Role" });
      }
    } catch (error) {
      next(error);
    }
  }
};
