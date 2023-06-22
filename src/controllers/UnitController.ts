import { UnitModel, Units } from "../models/UnitModel";

export default {
  getAllUnits: async (c, next) => {
    try {
      const unit = new UnitModel();
      let result = await unit.getAllData();
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getUnitByID: async (c, next) => {
    try {
      const unit = new UnitModel();
      let result = await unit.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createUnit: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Units = body;
      data.createdBy = c.req.user?.uid ?? "";
      const unit = new UnitModel(data);
      let result = await unit.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateUnit: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Units = body;
      data.updatedBy = c.req.user?.uid ?? null;
      const unit = new UnitModel(data);
      let result = await unit.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Unit" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteUnit: async (c, next) => {
    try {
      const unit = new UnitModel();
      let result = await unit.deleteData(parseInt(c.req.param("id") ?? 0));

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Unit" });
      }
    } catch (error) {
      next(error);
    }
  }
};
