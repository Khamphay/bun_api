import { verfToken, isAllPermis, isAdmAndEmp } from "../../middleware/Auth";
import stt from "../../controllers/StatusController";

import { Hono } from "hono";
const router = new Hono();

router.get("/", stt.getAllStatus);
router.get("/:id", stt.getStatusByID);
router.post("/", stt.createStatus);
router.put("/", stt.updateStatus);
router.delete("/:id", stt.deleteStatus);

export default router;
