import { Router } from "express";
import { CategoryRoutes } from "@/presentation/servers/express/category/routes";
import { MovementRoutes } from "@/presentation/servers/express/movement/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/categories", CategoryRoutes.routes);
    router.use("/api/v1/movements", MovementRoutes.routes);

    return router;
  }
}
