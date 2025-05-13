import { envs } from "@/config/envs";
import { MongodbDatabase } from "@/infrastructure/data/mongodb/config";
import { ExpressServer } from "@/presentation/express/server";

const main = async () => {
  const port = envs.PORT;
  const server = new ExpressServer({ port });

  MongodbDatabase.connect({
    databaseName: envs.MONGODB_DATABASE,
    mongodbUrl: envs.MONGODB_URL,
  });

  server.start();
};

(() => main())();
