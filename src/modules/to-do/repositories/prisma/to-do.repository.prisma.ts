import { ToDo } from "../../entities/to-do.entity";
import { prisma } from "../../../../shared/lib/prisma-client";
import { IToDoRepository } from "../interfaces/to-do-repository.interface";

export class ToDoRepositoryPrisma implements IToDoRepository {
  async create(toDo: ToDo): Promise<ToDo> {
    const created = await prisma.toDo.create({
      data: {
        id: toDo.id,
        title: toDo.title,
        description: toDo.description,
        completed: toDo.completed,
        createdAt: toDo.createdAt,
        updatedAt: toDo.updatedAt,
      },
    });

    return new ToDo(created);
  }

  async update(toDo: ToDo): Promise<ToDo> {
    const updated = await prisma.toDo.update({
      where: { id: toDo.id },
      data: {
        title: toDo.title,
        description: toDo.description,
        completed: toDo.completed,
        updatedAt: new Date(),
      },
    });

    return new ToDo(updated);
  }

  async findById(id: string): Promise<ToDo | null> {
    const found = await prisma.toDo.findUnique({
      where: { id },
    });

    if (!found) {
      return null;
    }

    return new ToDo(found);
  }
}
