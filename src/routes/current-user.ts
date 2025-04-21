import { currentUser } from "@ultickets/common";
import { Router, Request, Response } from "express";

const router = Router();

router.get(
  "/api/auth/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.status(201).send({
      currentUser: req.currentUser ?? null,
    });
  }
);

export { router as currentUserRouter };
