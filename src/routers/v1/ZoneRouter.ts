import zone from "../../controllers/ZoneController";

import { Hono } from "hono";
const router = new Hono();

router.get("/", zone.getAllZones);
router.get("/:id", zone.getZoneByID);
router.post("/", zone.createZone);
router.put("/", zone.updateZone);
router.delete("/:id", zone.deleteZone);

export default router;
