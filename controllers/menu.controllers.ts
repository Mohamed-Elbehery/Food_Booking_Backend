import { type Request, type Response } from "express";
import MenuItem from "../models/menu.model";

export class MenuControllers {
  public constructor() {}

  public async getMenuItems(_: Request, res: Response) {
    try {
      const result = await MenuItem.find({});

      res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  public async getMenuItemByID(req: Request, res: Response) {
    try {
      const { _id } = req.query;

      const result = await MenuItem.findById(_id);

      res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async addMenuItem(req: Request, res: Response) {
    try {
      const result = await MenuItem.create(req.body);

      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Bad Request" });
    }
  }

  public async deleteMenuItem(req: Request, res: Response) {
    try {
      const { _id } = req.query;
      
      const result = await MenuItem.deleteOne({ _id });

      res.status(200).json({data: result, message: "The Menu Item Has Been Deleted Successfully!"});
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Bad Request" });
    }
  }
  
  public async updateMenuItem(req: Request, res: Response) {
    try {
      const { _id } = req.query;
      
      const result = await MenuItem.updateOne({ _id }, req.body);

      res.status(200).json({data: result, message: "The Menu Item Has Been Updated Successfully!"});
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Bad Request" });
    }
  }
}

export const menuControllers = new MenuControllers();
