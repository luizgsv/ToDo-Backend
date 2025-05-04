import { AppError } from "../../../shared/erros/app-error";
import { CreateToDoDTO } from "../dto/create-to-do.dto";
import { UpdateToDoDTO } from "../dto/update-to-do.dto copy";
import { ToDo } from "../entities/to-do.entity";
import { IToDoRepository } from "../repositories/interfaces/to-do-repository.interface";

export class ToDoUseCase {
  constructor(private readonly toDoRepository: IToDoRepository) {}

  async createToDo(data: CreateToDoDTO): Promise<ToDo> {
    // Regras de negócio (validações simples)
    if (!data.title) {
      throw new AppError("Title is required", 400);
    }

    const toDo = new ToDo({
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description ?? null,
      completed: data.completed ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const created = await this.toDoRepository.create(toDo);

    return created;
  }

  async updateToDo(id: string, data: UpdateToDoDTO): Promise<ToDo> {
    const toDo = await this.toDoRepository.findById(id);

    if (!toDo) {
      throw new AppError("ToDo not found!", 404);
    }

    // Atualiza campos permitidos
    if (data.title) {
      toDo.update(data.title, data.description ?? toDo.description ?? "");
    }

    if (typeof data.completed === "boolean") {
      if (data.completed) {
        toDo.markAsCompleted();
      } else {
        toDo.completed = false;
        toDo.updatedAt = new Date();
      }
    }

    const updated = await this.toDoRepository.update(toDo);

    return updated;
  }

  async deleteToDo(id: string) {
    if (!id) {
      throw new AppError("Id is required", 400);
    }

    const toDo = await this.toDoRepository.findById(id);

    if (!toDo) {
      throw new AppError("ToDo not found!", 404);
    }

    await this.toDoRepository.delete(id);
  }
}
