import "dotenv/config";
import env from "env-var";

const { get } = env;

export const envs = {
  // Server config
  PORT: get("PORT").required().asPortNumber(),

  // Mongodb Config
  MONGODB_URL: get("MONGODB_URL").required().asUrlString(),
  MONGODB_DATABASE: get("MONGODB_DATABASE").required().asString(),
};
