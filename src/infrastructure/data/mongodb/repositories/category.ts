import { CategoryMapper } from "@/application/mappers/category";
import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { UpdateCategoryDto } from "@/domain/dtos/category/update";
import { CategoryEntity } from "@/domain/entities/category";
import { CategoryRepository } from "@/domain/repositories/category";
import { MongoDbErrorHandler } from "@/infrastructure/data/mongodb/errors/handler";
import { CategoryModel } from "@/infrastructure/data/mongodb/models/category";

export class MongoDbCategoryRepository implements CategoryRepository {
  async getById(id: string): Promise<CategoryEntity | null> {
    try {
      const foundDoc = await CategoryModel.findById(id);
      if (!foundDoc) return null;
      return CategoryMapper.categoryEntityFromObject(foundDoc.toObject());
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }

  async getByName(name: string): Promise<CategoryEntity | null> {
    try {
      const foundDoc = await CategoryModel.findOne({ name });
      if (!foundDoc) return null;
      return CategoryMapper.categoryEntityFromObject(foundDoc.toObject());
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }

  async updateById(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity | null> {
    try {
      const foundDoc = await CategoryModel.findByIdAndUpdate(
        id,
        { ...dto },
        { new: true },
      );
      if (!foundDoc) return null;
      await foundDoc.save();
      return CategoryMapper.categoryEntityFromObject(foundDoc.toObject());
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const foundDoc = await CategoryModel.findByIdAndDelete(id);
      return !!foundDoc;
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }

  async getAll(): Promise<CategoryEntity[]> {
    try {
      const foundDocs = await CategoryModel.find({});
      return foundDocs.map((doc) =>
        CategoryMapper.categoryEntityFromObject(doc.toObject()),
      );
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const newDoc = await CategoryModel.create({ ...dto });
      return CategoryMapper.categoryEntityFromObject(newDoc.toObject());
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }
}
