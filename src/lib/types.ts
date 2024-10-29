import { PinoLogger } from "hono-pino";

export interface AppBindings {
  Variables: {
    // tells TypeScript that when you use c.var.logger, it should be treated as a PinoLogger instance, allowing TypeScript to know the correct type and avoid errors.
    logger: PinoLogger;
  };
};