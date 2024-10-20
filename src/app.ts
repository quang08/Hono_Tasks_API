import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";

const app = new OpenAPIHono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get('/error', (c) => {
    c.status(402)
    throw new Error("Oh No!")
})

app.notFound(notFound)

app.onError(onError)

export default app;