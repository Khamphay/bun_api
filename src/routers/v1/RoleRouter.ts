import { verfToken, isAdmAndEmp } from "../../middleware/Auth";
import role from "../../controllers/RoleController";

import { Hono } from "hono";
const router = new Hono();

router.get("/", role.getAllRoles);
router.get("/:id", role.getRoleByID);
router.post("/", role.createRole);
router.put("/", role.updateRole);

export default router;
