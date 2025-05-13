import { CategoryRoutes } from "@/presentation/express/category/routes";
import { MovementRoutes } from "@/presentation/express/movement/routes";
import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/categories", CategoryRoutes.routes);
    router.use("/api/v1/movements", MovementRoutes.routes);

    return router;
  }
}
