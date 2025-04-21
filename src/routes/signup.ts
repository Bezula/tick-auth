import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { BadRequestError } from "@ultickets/common";

const router = Router();

router.post("/api/auth/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("User is existing");
  }

  const user = User.build({ email, password });

  await user.save();

  const token = jwt.sign(
    {
      userId: user.id,
      userEmail: user.email,
    },
    process.env.JWT_KEY!
  );

  req.session = {
    jwt: token,
  };

  res.status(201).send({ user });
});

export { router as signupRouter };
