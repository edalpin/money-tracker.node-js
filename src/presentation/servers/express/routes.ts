import { Router } from "express";
import { CategoryRoutes } from "@/presentation/servers/express/category/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/categories", CategoryRoutes.routes);

    return router;
  }
}
