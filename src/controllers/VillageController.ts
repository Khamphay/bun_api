import { VillageModel, Villages } from "../models/VillageModel";

export default {
  getAllVillages: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const village = new VillageModel();
      let result = await village.getAllData(body.page, body.perPage);
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getVillageByDistID: async (c, next) => {
    try {
      const village = new VillageModel();
      let result = await village.getVillageByDistID(
        parseInt(c.req.param("distId"))
      );
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getVillageByID: async (c, next) => {
    try {
      const village = new VillageModel();
      let result = await village.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createVillage: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Villages = body;
      data.createdBy = c.req.user?.uid ?? "";
      const village = new VillageModel(data);
      let result = await village.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateVillage: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Villages = body;
      data.updatedBy = c.req.user?.uid ?? "";
      const village = new VillageModel(data);
      let result = await village.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Village" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteVillage: async (c, next) => {
    try {
      const village = new VillageModel();
      let result = await village.deleteData(parseInt(c.req.param("id") ?? 0));

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Village" });
      }
    } catch (error) {
      next(error);
    }
  }
};
