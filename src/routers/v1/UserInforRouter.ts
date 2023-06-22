import {
  isAdmin,
  isAllPermis,
  isAdmAndEmp,
  verfToken
} from "../../middleware/Auth";
import user from "../../controllers/UserInforController";

import { Hono } from "hono";
const router = new Hono();

router.post("/", user.getAllUserInfors);
router.get("/infor", user.getUserInfor);
router.post("/byid", user.getUserInforByID);
router.post("/user", user.createUserInfor);
router.put("/", user.updateUserInfor);
router.delete("/:uid", user.deleteUserInfor);

export default router;
