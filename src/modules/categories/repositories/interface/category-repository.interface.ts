import { Category } from "../../entities/category.entity";

export interface ICategoryRepository {
  create: (categoryProps: Category) => Promise<Category>;
  update: (categoryProps: Category) => Promise<Category>;
  findById: (categoryId: string) => Promise<Category | null>;
  delete: (id: string) => Promise<void | null>;
}
