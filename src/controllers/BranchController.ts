import { BrancheModel, Branches } from "../models/BranchModel";

export default {
  getAllBranches: async (c, next) => {
    try {
      const branche = new BrancheModel();
      let result = await branche.getAllData();
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getBrancheByID: async (c, next) => {
    try {
      const branche = new BrancheModel();
      let result = await branche.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createBranche: async (c, next) => {
    try {
      const data: Branches = c.body;
      data.createdBy = c.c.req.user?.uid ?? "";
      const branche = new BrancheModel(data);
      let result = await branche.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateBranche: async (c, next) => {
    try {
      const data: Branches = await c.req.parseBody();
      data.updatedBy = c.c.req.user?.uid ?? "";
      const branche = new BrancheModel(data);
      let result = await branche.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Branche" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteBranche: async (c, next) => {
    try {
      const branche = new BrancheModel();
      let result = await branche.deleteData(parseInt(c.req.param("id") ?? 0));

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Branche" });
      }
    } catch (error) {
      next(error);
    }
  }
};
