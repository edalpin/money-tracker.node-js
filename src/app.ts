import 'module-alias/register';
import { envs } from "@/config/envs";
import { ExpressServer } from "@/presentation/express-server";
import { AppRoutes } from "@/presentation/routes";

const main = async () => {
  const port = envs.PORT;
  const routes = AppRoutes.routes;
  const server = new ExpressServer({ port, routes });

  server.start();
};

(() => main())();
