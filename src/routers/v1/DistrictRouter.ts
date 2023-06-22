import dist from "../../controllers/DistrictController";
import { Hono } from "hono";
const router = new Hono();

router.post("/", dist.getAllDistricts);
router.get("/province/:proId", dist.getDistrictByProID);
router.get("/:id", dist.getDistrictByID);
router.post("/add", dist.createDistrict);
router.put("/", dist.updateDistrict);
// router.delete("/",  dist.deleteDistrict);

export default router;
