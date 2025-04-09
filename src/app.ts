import { envs } from "#config/envs.ts";
import { ExpressServer } from "#presentation/express-server.ts";
import { AppRoutes } from "#presentation/routes.ts";

const main = async () => {
  const port = envs.PORT;
  const routes = AppRoutes.routes;
  const server = new ExpressServer({ port, routes });

  server.start();
};

(() => main())();
