import express, { Request, Response } from "express";

const app = express();

const port = process.env?.PORT ?? 8080;

app.get("/", (req: Request, res: Response) => {
  console.log("get works");

  res.status(200).send({});
});

app.listen(port, () => {
  console.log(`Listening on ports ${port}`);
});
