import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";

import { pinoLogger } from "./middlewares/pino-logger";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config())

interface AppBindings {
  Variables: {
    // tells TypeScript that when you use c.var.logger, it should be treated as a PinoLogger instance, allowing TypeScript to know the correct type and avoid errors.
    logger: PinoLogger;
  };
};

const app = new OpenAPIHono<AppBindings>();
app.use(pinoLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/error", (c) => {
  c.status(402);
  c.var.logger.debug("Only visible when debug level enabled");
  throw new Error("Oh No!");
});

app.notFound(notFound);

app.onError(onError);

export default app;
