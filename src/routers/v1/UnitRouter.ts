import { verfToken, isAllPermis, isAdmAndEmp } from "../../middleware/Auth";
import unit from "../../controllers/UnitController";

import { Hono } from "hono";
const router = new Hono();

router.get("/", unit.getAllUnits);
router.get("/:id", unit.getUnitByID);
router.post("/", unit.createUnit);
router.put("/", unit.updateUnit);
router.delete("/:id", unit.deleteUnit);

export default router;
