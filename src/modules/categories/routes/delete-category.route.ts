import { FastifyInstance } from "fastify";
import { AppError } from "../../../shared/erros/app-error";
import { CategoryRepositoryPrisma } from "../repositories/prisma/category-repository.prism";
import { categoryUseCase } from "../usecases/category.usecase";

export async function deleteCategory(app: FastifyInstance) {
  const repository = new CategoryRepositoryPrisma();
  const useCase = new categoryUseCase(repository);

  app.delete<{ Params: { categoryId: string } }>(
    "/:categoryId",
    async (request, reply) => {
      try {
        const { categoryId } = request.params;

        await useCase.deleteCategory(categoryId);

        return reply.status(204);
      } catch (error) {
        if (error instanceof AppError) {
          return reply
            .status(error.statusCode)
            .send({ message: error.message });
        }
        console.error(error);
        reply.status(500).send({ message: "Internal server error" });
      }
    }
  );
}
