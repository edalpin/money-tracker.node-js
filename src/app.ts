import { envs } from "@/config/envs";
import { ExpressServer } from "@/presentation/servers/express/server";
import { AppRoutes } from "@/presentation/servers/express/routes";
import { MongodbDatabase } from "@/presentation/databases/mongodb/config";

const main = async () => {
  const port = envs.PORT;
  const routes = AppRoutes.routes;
  const server = new ExpressServer({ port, routes });

  MongodbDatabase.connect({
    databaseName: envs.MONGODB_DATABASE,
    mongodbUrl: envs.MONGODB_URL,
  });

  server.start();
};

(() => main())();
