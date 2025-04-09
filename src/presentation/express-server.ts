import express, { Router } from "express";

type Options = {
  port: number;
  routes: Router;
};

export class ExpressServer {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port || 3000;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());

    // Routing
    this.app.use(this.routes);

    // Listen
    this.app.listen(this.port, () => {
      console.info(`Listening on port ${this.port}`);
    });
  }
}
