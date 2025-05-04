// src/modules/to-do/routes/create-to-do.route.ts

import { FastifyInstance } from "fastify";
import { ToDoUseCase } from "../../to-do/usecases/to-do.usecase";
import { ToDoRepositoryPrisma } from "../../to-do/repositories/prisma/to-do.repository.prisma";
import { CreateToDoDTO } from "../dto/create-to-do.dto";
import { AppError } from "../../../shared/erros/app-error";

export async function createToDoRoute(app: FastifyInstance) {
  const repository = new ToDoRepositoryPrisma();
  const useCase = new ToDoUseCase(repository);

  app.post<{ Body: CreateToDoDTO }>("/", async (request, reply) => {
    try {
      const { title, description, completed } = request.body;

      const result = await useCase.createToDo({
        title,
        description,
        completed,
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
