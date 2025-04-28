import { FastifyInstance } from "fastify";
import { createToDoRoute } from "./create-to-do.route";
import { updateToDoRoute } from "./update-to-do.route";

export async function toDoRoutes(app: FastifyInstance) {
  await createToDoRoute(app);
  await updateToDoRoute(app);
}
