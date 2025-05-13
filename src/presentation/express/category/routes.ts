import { MongoDbCategoryRepository } from "@/infrastructure/data/mongodb/repositories/category";
import { MongoDbValidator } from "@/infrastructure/data/mongodb/validators/validator";
import { CategoryController } from "@/presentation/express/category/controller";
import { Router } from "express";

export class CategoryRoutes {
  static get routes(): Router {
    // Instances
    const router = Router();
    const categoryRepository = new MongoDbCategoryRepository();
    const validator = new MongoDbValidator();
    const controller = new CategoryController(categoryRepository, validator);

    // Routes
    router.get("/:id", (req, res) => {
      controller.getCategory(req, res);
    });

    router.get("/", (req, res) => {
      controller.getAllCategories(req, res);
    });

    router.post("/", (req, res) => {
      controller.createCategory(req, res);
    });

    router.put("/:id", (req, res) => {
      controller.updateCategory(req, res);
    });

    router.delete("/:id", (req, res) => {
      controller.deleteCategory(req, res);
    });

    return router;
  }
}
