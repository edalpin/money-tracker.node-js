import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { UpdateCategoryDto } from "@/domain/dtos/category/update";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages } from "@/domain/errors/messages";
import { CategoryRepository } from "@/domain/repositories/category";
import { CreateCategoryUseCase } from "@/domain/use-cases/category/create";
import { DeleteCategoryUseCase } from "@/domain/use-cases/category/delete";
import { GetCategoriesUseCase } from "@/domain/use-cases/category/get-all";
import { GetCategoryUseCase } from "@/domain/use-cases/category/get-by-id";
import { UpdateCategoryUseCase } from "@/domain/use-cases/category/update";
import { Request, Response } from "express";

/* eslint no-console: ["error", { allow: ["error"] }] */
export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message });
    }
    console.error("Critical:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  getCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(categoryErrorMessages.missingId);
      const useCase = new GetCategoryUseCase(this.categoryRepository);
      const result = await useCase.execute(id);
      return res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getCategories = async (req: Request, res: Response) => {
    try {
      const useCase = new GetCategoriesUseCase(this.categoryRepository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  createCategory = async (req: Request, res: Response) => {
    try {
      const dto = CreateCategoryDto.create(req.body);
      const useCase = new CreateCategoryUseCase(this.categoryRepository);
      const result = await useCase.execute(dto);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(categoryErrorMessages.missingId);
      const dto = UpdateCategoryDto.create(req.body);
      const useCase = new UpdateCategoryUseCase(this.categoryRepository);
      const result = await useCase.execute(id, dto);
      return res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(categoryErrorMessages.missingId);
      const useCase = new DeleteCategoryUseCase(this.categoryRepository);
      const result = await useCase.execute(id);
      return res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
