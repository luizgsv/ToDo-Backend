import { ToDo } from "../../entities/to-do.entity";

export interface IToDoRepository {
  create(toDo: ToDo): Promise<ToDo>;
  update(toDo: ToDo): Promise<ToDo>;
  findById(id: string): Promise<ToDo | null>;
  delete(id: string): Promise<void | null>;
}
