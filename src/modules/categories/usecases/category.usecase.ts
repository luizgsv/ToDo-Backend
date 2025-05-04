import { AppError } from "../../../shared/erros/app-error";
import { CreateCategoryDTO } from "../dto/create-category.dto";
import { UpdateCategoryDTO } from "../dto/update-category.dto";
import { Category } from "../entities/category.entity";
import { ICategoryRepository } from "../repositories/interface/category-repository.interface";

export class categoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async createCategory(data: CreateCategoryDTO): Promise<Category> {
    if (!data.name) {
      throw new AppError("Name is required", 400);
    }

    const category = new Category({
      createdAt: new Date(),
      id: crypto.randomUUID(),
      name: data.name,
      updatedAt: new Date(),
    });

    const created = await this.categoryRepository.create(category);
    return created;
  }

  async updateCategory(id: string, data: UpdateCategoryDTO): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!id) {
      throw new AppError("Id is required", 400);
    }

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    if (!data.name) {
      throw new AppError("Name is required", 400);
    }

    category.update(data.name);

    const update = await this.categoryRepository.update(category);

    return update;
  }

  async deleteCategory(categoryId: string): Promise<void | null> {
    if (!categoryId) {
      throw new AppError("Id is required", 400);
    }

    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    await this.deleteCategory(category?.id);
  }
}
