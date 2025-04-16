import { MongoDbMovementRepository } from "@/application/repositories/mongodb/movement";
import { Router } from "express";
import { MovementController } from "@/presentation/servers/express/movement/controller";

export class MovementRoutes {
  static get routes(): Router {
    // Instances
    const router = Router();
    const repository = new MongoDbMovementRepository();
    const controller = new MovementController(repository);

    // Routes
    router.get("/:id", (req, res) => {
      controller.getMovement(req, res);
    });

    router.get("/", (req, res) => {
      controller.getMovements(req, res);
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
