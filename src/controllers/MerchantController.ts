import { MerchantModel, Merchants } from "../models/MerchanntModel";

export default {
  getAllMerchants: async (c, next) => {
    try {
      const merchant = new MerchantModel();
      let result = await merchant.getAllData();
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getMerchantByID: async (c, next) => {
    try {
      const merchant = new MerchantModel();
      let result = await merchant.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getMerchantByUID: async (c, next) => {
    try {
      const merchant = new MerchantModel();
      let result = await merchant.getMerchantByUID(c.c.req.user?.uid ?? "");
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createMerchant: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      const data: Merchants = body;
      data.createdBy = c.c.req.user?.uid ?? "";
      const merchant = new MerchantModel(data);
      let result = await merchant.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateMerchant: async (c, next) => {
    try {
      const body = await c.req.parseBody();
      const data: Merchants = body;
      data.updatedBy = c.c.req.user?.uid ?? "";
      const merchant = new MerchantModel(data);
      let result = await merchant.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Merchant" });
      }
    } catch (error) {
      next(error);
    }
  },

  approveMerchant: async (c, next) => {
    try {
      const merchant = new MerchantModel();
      let result = await merchant.approveMerchants(
        parseInt(c.req.param("id") ?? 0),
        c.c.req.user?.uid ?? ""
      );
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Merchant" });
      }
    } catch (error) {
      next(error);
    }
  },

  rejectMerchant: async (c, next) => {
    try {
      const merchant = new MerchantModel();
      const result = await merchant.rejectMerchants(
        parseInt(c.req.param("id") ?? 0),
        c.c.req.user?.uid ?? ""
      );
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Merchant" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteMerchant: async (c, next) => {
    try {
      const merchant = new MerchantModel();
      let result = await merchant.deleteData(parseInt(c.req.param("id") ?? 0));

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Merchant" });
      }
    } catch (error) {
      next(error);
    }
  }
};
