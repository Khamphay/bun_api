import { Zones, ZoneModel } from "../models/ZoneModel";

export default {
  getAllZones: async (c, next) => {
    try {
      const Zone = new ZoneModel();
      let result = await Zone.getAllData();
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getZoneByID: async (c, next) => {
    try {
      const Zone = new ZoneModel();
      let result = await Zone.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createZone: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Zones = body;
      data.createdBy = c.req.user?.uid;
      const Zone = new ZoneModel(data);
      let result = await Zone.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateZone: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Zones = body;
      data.updatedBy = c.req.user?.uid;
      const Zone = new ZoneModel(data);
      let result = await Zone.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Zone" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteZone: async (c, next) => {
    try {
      const Zone = new ZoneModel();
      let result = await Zone.deleteData(parseInt(c.req.param("id") ?? 0));

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Zone" });
      }
    } catch (error) {
      next(error);
    }
  }
};
