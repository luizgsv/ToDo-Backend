import { FastifyInstance } from "fastify";
import { CategoryRepositoryPrisma } from "../repositories/prisma/category-repository.prism";
import { categoryUseCase } from "../usecases/category.usecase";
import { CreateCategoryDTO } from "../dto/create-category.dto";
import { AppError } from "../../../shared/erros/app-error";

export async function createCategoryRoute(app: FastifyInstance) {
  const repository = new CategoryRepositoryPrisma();
  const useCase = new categoryUseCase(repository);

  app.post<{ Body: CreateCategoryDTO }>("/category", async (request, reply) => {
    try {
      const { name } = request.body;

      const result = await useCase.createCategory({
        name,
      });

      return reply.status(201).send(result);
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ message: error.message });
      }
      console.error(error);
      reply.status(500).send({ message: "Internal server error" });
    }
  });
}
