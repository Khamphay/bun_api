import { Hono } from "hono";
import { serveStatic } from "hono/serve-static.bun";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import router from "./routers/index";

const port = parseInt(process.env.PORT) || 3000;

const app = new Hono();

app.use("*", cors());
app.use("*", logger());
app.use("*", prettyJSON());
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));
app.route("/", router);
app.use("*", (c) => {
  if (c.error) {
    c.status(500);
    return c.json({ message: "Not Found" });
  }
});

console.log(`Running at http://localhost:${port}`);

Bun.serve({
  port: port,
  fetch: app.fetch
});
