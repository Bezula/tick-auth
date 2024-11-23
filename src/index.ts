import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env?.PORT ?? 8080;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("Connected to database");
  } catch (err) {
    console.error(err);
  }

  app.get("/", (req: Request, res: Response) => {
    console.log("get works");

    res.status(200).send({});
  });

  app.listen(port, () => {
    console.log(`Listening on ports ${port}`);
  });
};

start();
