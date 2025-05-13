import { MongoDbCategoryRepository } from "@/infrastructure/data/mongodb/repositories/category";
import { MongoDbMovementRepository } from "@/infrastructure/data/mongodb/repositories/movement";
import { MongoDbValidator } from "@/infrastructure/data/mongodb/validators/validator";
import { MovementController } from "@/presentation/express/movement/controller";
import { Router } from "express";

export class MovementRoutes {
  static get routes(): Router {
    // Instances
    const router = Router();
    const movementRepository = new MongoDbMovementRepository();
    const categoryRepository = new MongoDbCategoryRepository();
    const validator = new MongoDbValidator();
    const controller = new MovementController(
      movementRepository,
      categoryRepository,
      validator,
    );

    // Routes
    router.get("/:id", (req, res) => {
      controller.getMovement(req, res);
    });

    router.get("/", (req, res) => {
      controller.getAllMovements(req, res);
    });

    router.post("/", (req, res) => {
      controller.createMovement(req, res);
    });

    router.put("/:id", (req, res) => {
      controller.updateMovement(req, res);
    });

    router.delete("/:id", (req, res) => {
      controller.deleteMovement(req, res);
    });

    return router;
  }
}
