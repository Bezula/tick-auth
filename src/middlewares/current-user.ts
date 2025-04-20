import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
  req.session.currentUser = payload;

  next();
};
