import { verfToken, isAllPermis, isAdmAndEmp } from "../../middleware/Auth";
import stock from "../../controllers/StockController";

import { Hono } from "hono";
const router = new Hono();

router.post("/all", stock.getAllStocks);
router.get("/:merchantId/:id", stock.getStockByID);
router.post("/", stock.createStock);
router.put("/", stock.updateStock);
router.delete("/:merchantId/:id", stock.deleteStock);

export default router;
