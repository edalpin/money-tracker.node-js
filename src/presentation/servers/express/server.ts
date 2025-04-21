import express, { Router } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { genericErrorMessages } from "@/domain/errors/messages";

type Options = {
  port: number;
  routes: Router;
};

/* eslint no-console: ["error", { allow: ["info"] }] */
export class ExpressServer {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port || 3000;
    this.routes = routes;
  }

  private configureMiddlewares() {
    // Security headers
    this.app.use(helmet());

    // Enable CORS with specific configuration
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      }),
    );

    // Enable request compression
    this.app.use(compression());

    // Rate limiting
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: genericErrorMessages.tooManyRequests,
      }),
    );

    // Logging
    this.app.use(morgan("dev"));

    // JSON body parsing
    this.app.use(express.json());
  }

  async start() {
    // Configure middlewares
    this.configureMiddlewares();

    // Routing
    this.app.use(this.routes);

    // Listen
    this.app.listen(this.port, () => {
      console.info(`Listening on port ${this.port}`);
    });
  }
}
