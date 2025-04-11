import { Router } from "express";
import { MongoDbCategoryRepository } from "@/application/repositories/mongodb/category";
import { CategoryController } from "@/presentation/servers/express/category/controller";

export class CategoryRoutes {
  static get routes(): Router {
    // Instances
    const router = Router();
    const repository = new MongoDbCategoryRepository();
    const controller = new CategoryController(repository);

    // Routes
    router.get("/:id", (req, res) => {
      controller.getCategory(req, res);
    });

    router.get("/", (req, res) => {
      controller.getCategories(req, res);
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
