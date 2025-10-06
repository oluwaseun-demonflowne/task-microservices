import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { db } from "./db";
import { User } from "./db/schema";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught Expectation`);
  process.exit(1);
});

app.post("/users", async (req: Request, res: Response) => {
  const { email, name } = req.body as { name: string; email: string };
  try {
    await db.insert(User).values({ email, name });
    res.status(200).json({ message: "User successfully created" });
  } catch(error) {
    console.log(error)
    res.status(500).json({error:"Internal server error"})
  }
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).send(`Internal Server Error\n${err.stack}`);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
