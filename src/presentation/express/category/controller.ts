import { CreateCategoryUseCase } from "@/application/use-cases/category/create";
import { DeleteCategoryUseCase } from "@/application/use-cases/category/delete";
import { GetCategoryUseCase } from "@/application/use-cases/category/get";
import { GetCategoriesUseCase } from "@/application/use-cases/category/get-all";
import { UpdateCategoryUseCase } from "@/application/use-cases/category/update";
import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { UpdateCategoryDto } from "@/domain/dtos/category/update";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages, genericErrorMessages } from "@/domain/errors/messages";
import { CategoryRepository } from "@/domain/repositories/category";
import { DatabaseValidator } from "@/domain/validators/data-base";
import { ExpressErrorHandler } from "@/presentation/express/errors/handler";
import { Request, Response } from "express";

export class CategoryController {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly dataBaseValidator: DatabaseValidator,
  ) {}

  getCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(categoryErrorMessages.requiredId);
      const useCase = new GetCategoryUseCase(
        this.categoryRepository,
        this.dataBaseValidator,
      );
      const result = await useCase.execute(id);
      return res.json(result);
    } catch (error) {
      ExpressErrorHandler.handleError(error, res);
    }
  };

  getAllCategories = async (req: Request, res: Response) => {
    try {
      const useCase = new GetCategoriesUseCase(this.categoryRepository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      ExpressErrorHandler.handleError(error, res);
    }
  };

  createCategory = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (!body) throw CustomError.badRequest(genericErrorMessages.invalidObject);
      const dto = new CreateCategoryDto(body);
      const useCase = new CreateCategoryUseCase(this.categoryRepository);
      const result = await useCase.execute(dto);
      res.json(result);
    } catch (error) {
      ExpressErrorHandler.handleError(error, res);
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(categoryErrorMessages.requiredId);
      const body = req.body;
      if (!body) throw CustomError.badRequest(genericErrorMessages.invalidObject);
      const dto = new UpdateCategoryDto(body);
      const useCase = new UpdateCategoryUseCase(
        this.categoryRepository,
        this.dataBaseValidator,
      );
      const result = await useCase.execute(id, dto);
      return res.json(result);
    } catch (error) {
      ExpressErrorHandler.handleError(error, res);
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(categoryErrorMessages.requiredId);
      const useCase = new DeleteCategoryUseCase(
        this.categoryRepository,
        this.dataBaseValidator,
      );
      const isDeleted = await useCase.execute(id);
      if (isDeleted) {
        return res.status(204).send();
      } else {
        throw CustomError.badRequest(categoryErrorMessages.notDeleted);
      }
    } catch (error) {
      ExpressErrorHandler.handleError(error, res);
    }
  };
}
