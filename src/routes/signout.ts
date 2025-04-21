import { Router, Request, Response } from "express";

const router = Router();

router.post("/api/auth/signout", (req: Request, res: Response) => {
  req.session = null;
  res.status(201).send({});
});

export { router as signoutRouter };
