import express, { Express, Request, Response } from "express";
import { users, findUserByName } from "./users";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/users", (req: Request, res: Response) => {
  const name: string = req.query.name as string;
  if (!name) {
    res.send(users);
    return;
  } else {
    res.send({ users_list: findUserByName(name) });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is listening at http://localhost:${port}`);
});
