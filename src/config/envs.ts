import env from "env-var";
import "dotenv/config";

const { get } = env;

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
};
