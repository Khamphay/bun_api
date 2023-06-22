
import { Status, StatusModel } from "../models/StatusModel";

export default {
  getAllStatus: async (c, next) => {
    try {
      const stt = new StatusModel();
      let result = await stt.getAllData();
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getStatusByID: async (c, next) => {
    try {
      const stt = new StatusModel();
      let result = await stt.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createStatus: async (c, next) => {
    try {
      const body= c.req.parseBody()
      const data: Status = body;
      data.createdBy = c.req.user?.uid ?? "";
      const stt = new StatusModel(data);
      let result = await stt.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateStatus: async (c, next) => {
    try {
      const body= c.req.parseBody()
      const data: Status = body;
      data.updatedBy = c.req.user?.uid ?? null;
      const Status = new StatusModel(data);
      let result = await Status.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Status" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteStatus: async (c, next) => {
    try {
      const Status = new StatusModel();
      let result = await Status.deleteData(parseInt(c.req.param("id") ?? 0));

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Satus" });
      }
    } catch (error) {
      next(error);
    }
  }
};
