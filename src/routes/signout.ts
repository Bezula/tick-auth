import { Router, Request, Response } from "express";

const router = Router();

router.get("/signout", (req: Request, res: Response) => {
  res.status(201).send({});
});

export { router as signoutRouter };
