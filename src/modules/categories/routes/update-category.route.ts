import { FastifyInstance } from "fastify";
import { CategoryRepositoryPrisma } from "../repositories/prisma/category-repository.prism";
import { categoryUseCase } from "../usecases/category.usecase";
import { UpdateCategoryDTO } from "../dto/update-category.dto";
import { AppError } from "../../../shared/erros/app-error";

export async function updateCategory(app: FastifyInstance) {
  const repository = new CategoryRepositoryPrisma();
  const useCase = new categoryUseCase(repository);

  app.put<{ Body: UpdateCategoryDTO; Params: { id: string } }>(
    "/:id",
    async (request, reply) => {
      try {
        const body = request.body;
        const { id } = request.params;

        const result = await useCase.updateCategory(id, body);

        reply.status(200).send(result);
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
