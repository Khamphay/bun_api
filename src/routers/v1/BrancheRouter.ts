import { Hono } from "hono";

import branch from "../../controllers/BranchController";

const router = new Hono();

router.get("/", branch.getAllBranches);
router.get("/:id", branch.getBrancheByID);
router.post("/", branch.createBranche);
router.put("/", branch.updateBranche);
router.delete("/:id", branch.deleteBranche);

export default router;
