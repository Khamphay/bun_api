import { StockModel, Stocks } from "../models/StockModel";

export default {
  getAllStocks: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const stock = new StockModel();
      stock.merchantId = parseInt(body.merchantId);
      const result = await stock.getAllData(
        body.page,
        body.perPage,
        body.totalPages
      );
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  getStockByID: async (c, next) => {
    try {
      const stock = new StockModel();
      stock.merchantId = parseInt(c.req.param("merchantId"));
      let result = await stock.getOneDataByID(parseInt(c.req.param("id")));
      return c.json(result);
    } catch (error) {
      next(error);
    }
  },

  createStock: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Stocks = body;
      data.createdBy = c.req.user?.uid ?? "";
      const stock = new StockModel(data);
      let result = await stock.createData();
      return c.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateStock: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const data: Stocks = body;
      data.updatedBy = c.req.user?.uid ?? null;
      const stock = new StockModel(data);
      let result = await stock.updateData(data.id ?? 0);
      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Stock" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteStock: async (c, next) => {
    try {
      const stock = new StockModel();
      stock.merchantId = parseInt(c.req.param("merchantId"));
      let result = await stock.deleteData(parseInt(c.req.param("id") ?? 0));

      if (result != null) return c.json(result);
      else {
        c.status(400);
        return c.json({ msg: "Not found Product" });
      }
    } catch (error) {
      next(error);
    }
  }
};
