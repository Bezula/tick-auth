import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(201).send(req.session!.currentUser);
});

export { router as currentUserRouter };
