import { Application } from "./deps.ts";
import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(`${hostname}:${port}`);
});

app.addEventListener("error", (e) => {
  console.log(e.error);
});

await app.listen({ port: 8000 });
