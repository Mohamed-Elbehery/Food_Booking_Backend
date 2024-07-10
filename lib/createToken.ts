import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
const maxAge = 3 * 24 * 60 * 60;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? ""

dotenv.config();

export const createToken = (_id: mongoose.Schema.Types.ObjectId | mongoose.Types.ObjectId) => {
  return jwt.sign({ _id }, JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};