import fastify from "fastify";
import { toDoRoutes } from "./modules/to-do/routes";

const app = fastify();

async function bootstrap() {
  await app.register(toDoRoutes, { prefix: "/toDo" });

  await app.listen({ port: 3000 }).then(() => {
    console.log("Server is running on http://localhost:3000");
  });
}

bootstrap();
