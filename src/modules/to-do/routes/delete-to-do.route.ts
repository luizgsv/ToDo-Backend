import { FastifyInstance } from "fastify";
import { ToDoRepositoryPrisma } from "../repositories/prisma/to-do.repository.prisma";
import { ToDoUseCase } from "../usecases/to-do.usecase";
import { AppError } from "../../../shared/erros/app-error";

export async function deleteTodoRoute(app: FastifyInstance) {
  const repository = new ToDoRepositoryPrisma();
  const useCase = new ToDoUseCase(repository);

  app.delete<{ Params: { categoryId: string } }>("/:categoryId", async (request, reply) => {
    try {
      const { categoryId } = request.params;

      await useCase.deleteToDo(categoryId);
      return reply.status(204);
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ message: error.message });
      }
      console.error(error);
      reply.status(500).send({ message: "Internal server error" });
    }
  });
}
