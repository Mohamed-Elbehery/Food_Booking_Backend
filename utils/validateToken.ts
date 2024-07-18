import { Request, Response } from "express";
import User from "../models/auth.model";
import jwt, { JwtPayload } from "jsonwebtoken";

interface IDecoded extends JwtPayload {
  _id: string;
  iat: number;
  exp: number;
}

export class ValidateToken {
  public constructor() {}

  public static async validateToken(req: Request) {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as IDecoded;
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "admin") {
      throw new Error("You don't have permissions to make this request");
    }

    return user._id.toString();
  }

  public static catchTokenErrors(res: Response, err: Error) {
    const msg = err.message;

    if (msg.includes("E11000")) {
      return res.status(400).json({ message: "Email is alreaady taken!" });
    }

    const error = msg.includes("Authentication token is missing")
      ? "Authentication token is missing"
      : msg.includes("User not found")
      ? "User not found"
      : msg.includes("You don't have permissions to make this request")
      ? "You don't have permissions to make this request"
      : "Bad Request!";

    const status = msg.includes("Authentication token is missing")
      ? 401
      : msg.includes("User not found")
      ? 404
      : msg.includes("You don't have permissions to make this request")
      ? 403
      : 400;

      return res.status(status).json({ message: error });
  }

}
