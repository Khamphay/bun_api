import { Hono } from "hono/";
import v1 from "./v1/index";
const router = new Hono();
router.route("/v1", v1);
router.get("/express", (c) => c.json({ api: "express-ts", version: "1.0.0" }));

export default router;
