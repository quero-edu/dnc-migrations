import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import GetRequest from "./dtos/get.request";
import PostRequest from "./dtos/post.request";
import PostResponse from "./dtos/post.response";

dotenv.config();

const app: Express = express();
app.use( bodyParser.json() ); 
const port = process.env.PORT || 3000;

app.post("/", (req: Request, res: Response) => {

  const body: PostRequest = req.body;

  const response: PostResponse = {
    name: body.name,
    email: body.email,
    age: body.age,
    isAdult: body.age >= 18,
  }

  res.json(response);
});

app.get("/", (req: Request, res: Response) => {

  const request: GetRequest = req.query

  if(request.name) {
    res.send(`Olá, ${request.name}!`);
  } else {
    res.send("Olá, Visitante!");
  }

});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});