import { type Request, type Response } from "express";
import User from "../models/auth.model";
import { createToken } from "../lib/createToken";
import { cloudinaryConfig } from "../utils/cloudinary";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Error } from "mongoose";

interface IDecoded extends JwtPayload {
  _id: string;
  iat: number;
  exp: number;
}

export class AuthControllers {
  public constructor() {}

  public static async validateToken(req: Request, res: Response) {
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

  public async getAllUsers(req: Request, res: Response) {
    try {
      await AuthControllers.validateToken(req, res);

      const allUsers = await User.find({});
      return res.status(200).json({ data: allUsers });
    } catch (err) {
      const msg = (err as Error).message;

      const error = msg.includes("Authentication token is missing")
        ? "Authentication token is missing"
        : msg.includes("User not found")
        ? "User not found"
        : msg.includes("You don't have permissions to make this request")
        ? "You don't have permissions to make this request"
        : "Server Error";

      const STATUS = msg.includes("Authentication token is missing")
        ? 401
        : msg.includes("User not found")
        ? 404
        : msg.includes("You don't have permissions to make this request")
        ? 403
        : 500;

      return res.status(STATUS).json({ message: error });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { _id } = req.query;

      await AuthControllers.validateToken(req, res);

      const user = await User.findById(_id);
      return res.status(200).json(user);
    } catch (err) {
      const msg = (err as Error).message;

      const error = msg.includes("Authentication token is missing")
        ? "Authentication token is missing"
        : msg.includes("User not found")
        ? "User not found"
        : msg.includes("You don't have permissions to make this request")
        ? "You don't have permissions to make this request"
        : "Server Error";

      const STATUS = msg.includes("Authentication token is missing")
        ? 401
        : msg.includes("User not found")
        ? 404
        : msg.includes("You don't have permissions to make this request")
        ? 403
        : 500;

      return res.status(STATUS).json({ message: error });
    }
  }

  public async register(req: Request, res: Response) {
    try {
      const { name, email, password, profile_img, phone_number } = req.body;
      const uploadedResponse = await cloudinaryConfig.uploader.upload(
        profile_img,
        {
          upload_preset: "food_booking",
        }
      );

      const user = await User.create({
        name,
        email,
        password,
        profile_img: uploadedResponse?.url,
        phone_number,
      });

      const token = createToken(user._id);

      return res.status(201).json({ date: user, token });
    } catch (err) {
      const msg = (err as Error).message;

      if (msg.includes("E11000")) {
        return res.status(400).json({ message: "Email is alreaady taken!" });
      }

      const error = msg.includes("Authentication token is missing")
        ? "Authentication token is missing"
        : msg.includes("User not found")
        ? "User not found"
        : msg.includes("You don't have permissions to make this request")
        ? "You don't have permissions to make this request"
        : "Server Error";

      const STATUS = msg.includes("Authentication token is missing")
        ? 401
        : msg.includes("User not found")
        ? 404
        : msg.includes("You don't have permissions to make this request")
        ? 403
        : 500;

      return res.status(STATUS).json({ message: error });
    }
  }

  public async adminRegister(req: Request, res: Response) {
    try {
      await AuthControllers.validateToken(req, res);

      const { name, email, password, profile_img, phone_number } = req.body;

      const uploadedResponse = await cloudinaryConfig.uploader.upload(
        profile_img,
        {
          upload_preset: "food_booking",
        }
      );

      const user = await User.create({
        name,
        email,
        password,
        profile_img: uploadedResponse?.url,
        phone_number,
        role: "admin",
      });

      const token = createToken(user._id);

      return res.status(201).json({ date: user, token });
    } catch (err) {
      const msg = (err as Error).message;

      if (msg.includes("E11000")) {
        return res.status(400).json({ message: "Email is alreaady taken!" });
      }

      const error = msg.includes("Authentication token is missing")
        ? "Authentication token is missing"
        : msg.includes("User not found")
        ? "User not found"
        : msg.includes("You don't have permissions to make this request")
        ? "You don't have permissions to make this request"
        : "Server Error";

      const STATUS = msg.includes("Authentication token is missing")
        ? 401
        : msg.includes("User not found")
        ? 404
        : msg.includes("You don't have permissions to make this request")
        ? 403
        : 500;

      return res.status(STATUS).json({ message: error });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.login(email, password);
      const token = createToken(user._id);
      user.password = "";

      return res.json({ data: user, token });
    } catch (err) {
      const msg = (err as Error).message;

      const error = msg.includes("Authentication token is missing")
        ? "Authentication token is missing"
        : msg.includes("User not found")
        ? "User not found"
        : msg.includes("You don't have permissions to make this request")
        ? "You don't have permissions to make this request"
        : "Server Error";

      const STATUS = msg.includes("Authentication token is missing")
        ? 401
        : msg.includes("User not found")
        ? 404
        : msg.includes("You don't have permissions to make this request")
        ? 403
        : 500;

      return res.status(STATUS).json({ message: error });
    }
  }

  public async changeRole(req: Request, res: Response) {
    try {
      const { _id, role } = req.query;

      const adminID = await AuthControllers.validateToken(req, res);

      if (role != "admin" && role != "normal")
        return res
          .status(400)
          .json({ message: 'User role should be either "admin" or "normal"' });

      if (adminID == _id)
        return res
          .status(400)
          .json({ message: "Error, you can't change your role." });

      const updatedUser = await User.updateOne({ _id }, { role });

      return res.status(200).json({
        data: updatedUser,
        message: `User Role Changed Successfully to ${role}`,
      });
    } catch (err) {
      const msg = (err as Error).message;

      const error = msg.includes("Authentication token is missing")
        ? "Authentication token is missing"
        : msg.includes("User not found")
        ? "User not found"
        : msg.includes("You don't have permissions to make this request")
        ? "You don't have permissions to make this request"
        : "Server Error";

      const STATUS = msg.includes("Authentication token is missing")
        ? 401
        : msg.includes("User not found")
        ? 404
        : msg.includes("You don't have permissions to make this request")
        ? 403
        : 500;

      return res.status(STATUS).json({ message: error });
    }
  }
}

export const authControllers = new AuthControllers();
