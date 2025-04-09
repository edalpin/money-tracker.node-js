import env from "env-var";

const { get } = env;

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
};
