import login from "../../middleware/UserLogin";

import { Hono } from "hono";
const router = new Hono();

router.post("/", login.userSignIn);
router.post("/refToken", login.refreshSignInToken);

export default router;
