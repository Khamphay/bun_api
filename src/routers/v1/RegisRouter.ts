import register from "../../middleware/Register";

import { Hono } from "hono";
const router = new Hono();

router.post("/exsyst/admin", register.adminRegister);
router.post("/", register.userRegister);

export default router;
