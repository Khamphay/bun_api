import { DistrictModel, Districts } from "../models/DistrictModel";

export default {
  getAllDistricts: async (c, next) => {
    try {
      const district = new DistrictModel();
      const { page, perPage, totalPages } = await c.c.req.parseBody();
      const result = await district.getAllData(page, perPage, totalPages);
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getDistrictByProID: async (c, next) => {
    try {
      const district = new DistrictModel();
      let result = await district.getDistrictByProID(
        parseInt(c.c.req.param("proId"))
      );
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getDistrictByID: async (c, next) => {
    try {
      const district = new DistrictModel();
      let result = await district.getOneDataByID(parseInt(c.c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createDistrict: async (c, next) => {
    try {
      const data: Districts = await c.req.parseBody();
      const district = new DistrictModel(data);
      let result = await district.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateDistrict: async (c, next) => {
    try {
      const data: Districts = await c.req.parseBody();
      const district = new DistrictModel(data);
      let result = await district.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found District" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteDistrict: async (c, next) => {
    try {
      const district = new DistrictModel();
      const result = await district.deleteData(
        parseInt(c.req.param("id") ?? 0)
      );

      if (result != null) return c.json(result);
      else {
        c.status(400);
        c.json({ msg: "Not found District" });
      }
    } catch (error) {
      next(error);
    }
  }
};
