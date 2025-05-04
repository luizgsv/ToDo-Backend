import { FastifyInstance } from "fastify";
import { AppError } from "../../../shared/erros/app-error";
import { ToDoRepositoryPrisma } from "../../to-do/repositories/prisma/to-do.repository.prisma";
import { ToDoUseCase } from "../../to-do/usecases/to-do.usecase";
import { UpdateToDoDTO } from "../dto/update-to-do.dto copy";

export async function updateToDoRoute(app: FastifyInstance) {
  const repository = new ToDoRepositoryPrisma();
  const useCase = new ToDoUseCase(repository);

  app.put<{ Body: UpdateToDoDTO; Params: { id: string } }>(
    ":id",
    async (request, reply) => {
      try {
        const { id } = request.params;
        const { title, description, completed } = request.body;

        const result = await useCase.updateToDo(id, {
          title,
          description,
          completed,
        });

        return reply.status(200).send(result);
      } catch (error) {
        if (error instanceof AppError) {
          return reply
            .status(error.statusCode)
            .send({ message: error.message });
        }

        console.error(error);
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );
}
