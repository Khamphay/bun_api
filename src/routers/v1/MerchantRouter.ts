import merchant from "../../controllers/MerchantController";

import { Hono } from "hono";
const router = new Hono();

router.get("/", merchant.getAllMerchants);
router.get("/:id", merchant.getMerchantByID);
router.get("/user/uid", merchant.getMerchantByUID);
router.post("/", merchant.createMerchant);
router.put("/", merchant.updateMerchant);
router.put("/approve/:id", merchant.approveMerchant);
router.put("/reject/:id", merchant.rejectMerchant);
router.delete("/:id", merchant.deleteMerchant);

export default router;
