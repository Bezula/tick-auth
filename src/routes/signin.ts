import { Router, Request, Response } from "express";
import { body } from "express-validator";

const router = Router();

router.get(
  "/signin",
  [body("email").notEmpty().isEmail(), body("password").notEmpty()],
  (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as signinRouter };
