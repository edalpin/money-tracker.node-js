import { CategoryMapper } from "@/application/mappers/category";
import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { UpdateCategoryDto } from "@/domain/dtos/category/update";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages, genericErrorMessages } from "@/domain/errors/messages";
import { CategoryRepository } from "@/domain/repositories/category";
import { CategoryModel } from "@/presentation/databases/mongodb/models/category";
import { isValidObjectId } from "mongoose";

export class MongoDbCategoryRepository implements CategoryRepository {
  private handleError(error: unknown) {
    if (error instanceof CustomError) throw error;
    throw new Error(genericErrorMessages.serverError);
  }

  getCategory = async (id: string) => {
    try {
      const isValid = isValidObjectId(id);
      if (!isValid) throw CustomError.badRequest(categoryErrorMessages.invalidId);
      const foundDoc = await CategoryModel.findById(id);
      if (!foundDoc) throw CustomError.badRequest(categoryErrorMessages.notFound);
      const categoryEntity = CategoryMapper.categoryEntityFromObject(foundDoc);
      return categoryEntity;
    } catch (error) {
      throw this.handleError(error);
    }
  };

  getCategories = async () => {
    try {
      const foundDocs = await CategoryModel.find({});
      const categoryEntities = foundDocs.map((doc) => {
        return CategoryMapper.categoryEntityFromObject(doc);
      });
      return categoryEntities;
    } catch (error) {
      throw this.handleError(error);
    }
  };

  createCategory = async (dto: CreateCategoryDto) => {
    try {
      const doc = await CategoryModel.create({ ...dto });
      await doc.save();
      const categoryEntity = CategoryMapper.categoryEntityFromObject(doc);
      return categoryEntity!;
    } catch (error) {
      throw this.handleError(error);
    }
  };

  updateCategory = async (id: string, dto: UpdateCategoryDto) => {
    try {
      const isValid = isValidObjectId(id);
      if (!isValid) throw CustomError.badRequest(categoryErrorMessages.invalidId);
      const foundDoc = await CategoryModel.findByIdAndUpdate(
        id,
        { ...dto },
        { new: true },
      );
      if (!foundDoc) throw CustomError.badRequest(categoryErrorMessages.notFound);
      await foundDoc.save();
      const categoryEntity = CategoryMapper.categoryEntityFromObject(foundDoc);
      return categoryEntity;
    } catch (error) {
      throw this.handleError(error);
    }
  };

  deleteCategory = async (id: string) => {
    try {
      const isValid = isValidObjectId(id);
      if (!isValid) throw CustomError.badRequest(categoryErrorMessages.invalidId);
      await CategoryModel.findByIdAndDelete(id);
      return;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
