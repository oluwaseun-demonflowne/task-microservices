import express, {
    type Request,
    type Response,
    type NextFunction
  } from "express";
  import * as dotenv from "dotenv";
  import http from "http";
  import cors from "cors"
  dotenv.config();
  
  const app = express();
  const port = process.env.PORT || 3001;
  const server = http.createServer(app);
  
  app.use(cors({
    origin: "http://localhost:3000"
  }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Expectation`);
    process.exit(1);
  });
  
  
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).send(`Internal Server Error\n${err.stack}`);
  });
  
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });