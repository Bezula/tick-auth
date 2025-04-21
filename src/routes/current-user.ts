import { Router, Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";

const router = Router();

router.get(
  "/api/auth/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.status(201).send({
      currentUser: req.session?.currentUser ?? null,
    });
  }
);

export { router as currentUserRouter };
