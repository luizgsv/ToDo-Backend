import { prisma } from "../../../../shared/lib/prisma-client";
import { Category } from "../../entities/category.entity";
import { ICategoryRepository } from "../interface/category-repository.interface";

export class CategoryRepositoryPrisma implements ICategoryRepository {
  async create(categoryProps: Category): Promise<Category> {
    const createCategory = await prisma.category.create({
      data: {
        createdAt: categoryProps.createdAt,
        id: categoryProps.id,
        name: categoryProps.name,
        updatedAt: categoryProps.updatedAt,
      },
    });

    return new Category(createCategory);
  }

  async update(categoryProps: Category): Promise<Category> {
    const updateCategory = await prisma.category.update({
      where: {
        id: categoryProps.id,
      },
      data: {
        createdAt: categoryProps.createdAt,
        id: categoryProps.id,
        name: categoryProps.name,
        updatedAt: categoryProps.updatedAt,
      },
    });

    return new Category(updateCategory);
  }

  async findById(categoryId: string): Promise<Category | null> {
    const found = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!found) {
      return null;
    }

    return new Category(found);
  }

  async delete(categoryId: string) {
    const found = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!found) {
      return null;
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
