import vill from "../../controllers/VillageController";

import { Hono } from "hono";
const router = new Hono();

router.post("/", vill.getAllVillages);
router.get("/district/:distId", vill.getVillageByDistID);
router.get("/:id", vill.getVillageByID);
router.post("/add", vill.createVillage);
router.put("/", vill.updateVillage);
router.delete("/:id", vill.deleteVillage);

export default router;
