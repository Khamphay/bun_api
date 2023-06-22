import { isAllPermis, verfToken, isAdmAndEmp } from "../../middleware/Auth";
import poss from "../../controllers/PossitionController";

import { Hono } from "hono";
const router = new Hono();

router.get("/", poss.getAllPossitions);
router.get("/:id", poss.getPossitionByID);
router.post("/", poss.createPossition);
router.put("/", poss.updatePossition);
router.delete("/:id", poss.deletePossition);

export default router;
