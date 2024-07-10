import { menuControllers } from "./../controllers/menu.controllers";
import express from "express";
export const menuRouter = express.Router();

menuRouter
  .get("/", menuControllers.getMenuItems)
  .get("/item", menuControllers.getMenuItemByID)
  .post("/", menuControllers.addMenuItem)
  .delete("/", menuControllers.deleteMenuItem)
  .patch("/", menuControllers.updateMenuItem);
