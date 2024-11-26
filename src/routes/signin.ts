import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = Router();

router.get(
  "/api/users/signin",
  [body("email").notEmpty().isEmail(), body("password").notEmpty()],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("User not exisiting");
    }

    const passwordMatch = Password.compare(existingUser.password, password);
    if (!passwordMatch) {
      throw new Error("Password not matched");
    }

    // Generate jwt token
    // req.session = {
    //   jwt: 'string jwt'
    // }

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
