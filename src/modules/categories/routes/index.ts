import { FastifyInstance } from "fastify";
import { createCategoryRoute } from "./create-category.route";
import { updateCategory } from "./update-category.route";
import { deleteCategory } from "./delete-category.route";

export async function categoryRoutes(app: FastifyInstance) {
  await createCategoryRoute(app);
  await updateCategory(app);
  await deleteCategory(app);
}
