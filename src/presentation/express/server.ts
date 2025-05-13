import { genericErrorMessages } from "@/domain/errors/messages";
import { AppRoutes } from "@/presentation/express/routes";
import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

type Options = {
  port: number;
};

/* eslint no-console: ["error", { allow: ["info"] }] */
export class ExpressServer {
  private readonly app = express();
  private readonly port: number;
  private readonly routes = AppRoutes.routes;

  constructor(options: Options) {
    const { port } = options;
    this.port = port || 3000;
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
