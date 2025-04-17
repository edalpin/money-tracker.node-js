import type { Config } from "jest";

const config: Config = {
  verbose: true,
  transform: { "^.+\\.(t|j)s$": ["ts-jest", { tsconfig: "tsconfig.test.json" }] },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
