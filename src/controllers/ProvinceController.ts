import { ProvinceModel, Provinces } from "../models/ProvinceModel";

export default {
  getAllProvinces: async (c, next) => {
    try {
      const province = new ProvinceModel();
      let result = await province.getAllData();
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getProvinceByID: async (c, next) => {
    try {
      const province = new ProvinceModel();
      let result = await province.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createProvince: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      const data: Provinces = body;
      const province = new ProvinceModel(data);
      let result = await province.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateProvince: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      const data: Provinces = body;
      const province = new ProvinceModel(data);
      let result = await province.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Province" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteProvince: async (c, next) => {
    try {
      const province = new ProvinceModel();
      let result = await province.deleteData(parseInt(c.req.param("id") ?? 0));

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Province" });
      }
    } catch (error) {
      next(error);
    }
  }
};
