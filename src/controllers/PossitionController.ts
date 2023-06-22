import { PossitionModel, Possitions } from "../models/PossitionModel";

export default {
  getAllPossitions: async (c, next) => {
    try {
      const possition = new PossitionModel();
      let result = await possition.getAllData();
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getPossitionByID: async (c, next) => {
    try {
      const possition = new PossitionModel();
      let result = await possition.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createPossition: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      const data: Possitions = body;
      data.createdBy = c.c.req.user?.uid ?? "";
      const possition = new PossitionModel(data);
      let result = await possition.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updatePossition: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      const data: Possitions = body;
      data.updatedBy = c.c.req.user?.uid ?? null;
      const possition = new PossitionModel(data);
      let result = await possition.updateData(data.id ?? 0);
      if (result != null) c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Possition" });
      }
    } catch (error) {
      next(error);
    }
  },

  deletePossition: async (c, next) => {
    try {
      const possition = new PossitionModel();
      let result = await possition.deleteData(parseInt(c.req.param("id") ?? 0));

      if (result != null) c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Possition" });
      }
    } catch (error) {
      next(error);
    }
  }
};
