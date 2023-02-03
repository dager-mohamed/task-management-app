import express from "express";
import cors from "cors";
import { connectMongoose } from "./connectMongoose";
import route from "../routes/index";

export async function createApp(): Promise<express.Express> {
  const app = express();
  app.use(cors());
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  await connectMongoose(process.env.MONGO_URL);

  app.use("/api", route);
  return app;
}
