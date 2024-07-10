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
    const { _id } = req.query;

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as IDecoded;

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You don't have permissions to make this request" });
    }

    if (user._id.toString() == _id)
      return res
        .status(400)
        .json({ message: "Error, you can't change your role." });
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      AuthControllers.validateToken(req, res);

      const allUsers = await User.find({});
      res.status(200).json({ data: allUsers });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { _id } = req.query;

      AuthControllers.validateToken(req, res);

      const user = await User.findById(_id);
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
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

      res.status(201).json({ date: user, token });
    } catch (err) {
      const errorMessage = (err as Error).message;
      console.error(errorMessage);
      if (errorMessage.includes("E11000"))
        res.status(400).json({ message: "Email is alreaady taken!" });
      res.status(500).json({ error: "Server error" });
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

      res.status(201).json({ date: user, token });
    } catch (err) {
      const errorMessage = (err as Error).message;
      console.error(errorMessage);
      if (errorMessage.includes("E11000"))
        res.status(400).json({ message: "Email is alreaady taken!" });
      res.status(500).json({ error: "Server error" });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.login(email, password);
      const token = createToken(user._id);
      user.password = "";

      res.json({ data: user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  public async changeRole(req: Request, res: Response) {
    try {
      const { _id, role } = req.query;

      await AuthControllers.validateToken(req, res);

      if (role != "admin" && role != "normal")
        return res
          .status(400)
          .json({ message: 'User role should be either "admin" or "normal"' });

      const updatedUser = await User.updateOne({ _id }, { role });

      res.status(200).json({
        data: updatedUser,
        message: `User Role Changed Successfully to ${role}`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export const authControllers = new AuthControllers();
