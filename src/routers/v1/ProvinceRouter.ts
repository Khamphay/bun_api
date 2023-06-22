import { verfToken, isAdmAndEmp } from "../../middleware/Auth";
import prov from "../../controllers/ProvinceController";

import { Hono } from "hono";
const router = new Hono();

router.get("/", prov.getAllProvinces);
router.get("/:id", prov.getProvinceByID);
router.post("/", prov.createProvince);
router.put("/", prov.updateProvince);
// router.delete("/:id",  prov.deleteProvince);

export default router;
