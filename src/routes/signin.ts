import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "@ultickets/common";

const router = Router();

router.post(
  "/api/auth/signin",
  [body("email").notEmpty().isEmail(), body("password").notEmpty()],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new NotAuthorizedError();
    }

    const passwordMatch = Password.compare(existingUser.password, password);
    if (!passwordMatch) {
      throw new NotAuthorizedError();
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        userEmail: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: token,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
