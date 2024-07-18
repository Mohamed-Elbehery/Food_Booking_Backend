import { type Request, type Response } from "express";
import User from "../models/auth.model";
import { createToken } from "../lib/createToken";
import { cloudinaryConfig } from "../utils/cloudinary";
import { Error } from "mongoose";
import { ValidateToken } from "../utils/validateToken";

export class AuthControllers {
  public constructor() {}

  public async getAllUsers(req: Request, res: Response) {
    try {
      await ValidateToken.validateToken(req);

      const allUsers = await User.find({});

      return res.status(200).json(allUsers);
    } catch (err) {
      return ValidateToken.catchTokenErrors(res, err as Error);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { _id } = req.query;

      await ValidateToken.validateToken(req);

      const user = await User.findById(_id);

      if (!user) {
        res.status(404).json({ message: "There is no user with this ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return ValidateToken.catchTokenErrors(res, err as Error);
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
      return ValidateToken.catchTokenErrors(res, err as Error);
    }
  }

  public async adminRegister(req: Request, res: Response) {
    try {
      await ValidateToken.validateToken(req);

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
      return ValidateToken.catchTokenErrors(res, err as Error);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.login(email, password);

      const token = createToken(user._id);

      user.password = "";

      return res.json({
        data: user,
        token,
      });
    } catch (err) {
      return ValidateToken.catchTokenErrors(res, err as Error);
    }
  }

  public async changeRole(req: Request, res: Response) {
    try {
      const { _id, role } = req.query;

      const adminID = await ValidateToken.validateToken(req);

      if (!adminID) return;

      if (role != "admin" && role != "normal")
        return res
          .status(400)
          .json({ message: 'User role should be either "admin" or "normal"' });

      if (adminID == _id)
        return res
          .status(400)
          .json({ message: "Error, you can't change your role." });

      const updatedUser = await User.updateOne({ _id }, { role });

      return res.status(200).json(updatedUser);
    } catch (err) {
      return ValidateToken.catchTokenErrors(res, err as Error);
    }
  }
}

export const authControllers = new AuthControllers();
