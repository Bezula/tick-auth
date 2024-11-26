import { Router, Request, Response } from "express";

const router = Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  res.status(201).send({
    currentUser: req.session?.currentUser ?? null,
  });
});

export { router as currentUserRouter };
