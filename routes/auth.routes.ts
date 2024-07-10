import { authControllers } from "./../controllers/auth.controllers";
import express from "express";
export const authRouter = express.Router();

authRouter
  .get("/", authControllers.getAllUsers)
  .get("/user", authControllers.getUserById)
  .post("/register", authControllers.register)
  .post("/admin-register", authControllers.adminRegister)
  .post("/login", authControllers.login)
  .patch("/change-role", authControllers.changeRole);
