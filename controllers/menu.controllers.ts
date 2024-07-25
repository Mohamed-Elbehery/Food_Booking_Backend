import { type Request, type Response } from "express";
import MenuItem from "../models/menu.model";
import { ValidateToken } from "../utils/validateToken";
import { cloudinaryConfig } from "../utils/cloudinary";

export class MenuControllers {
  public constructor() {}

  public async getMenuItems(_: Request, res: Response) {
    try {
      const result = await MenuItem.find({});

      res.status(200).json(result);
    } catch (err) {
      ValidateToken.catchTokenErrors(res, err as Error);
    }
  }
  
  public async getMenuItemByID(req: Request, res: Response) {
    try {
      const { _id } = req.query;

      const result = await MenuItem.findById(_id);

      if(!result) {
        res.status(404).json({message: "There is no item with this ID in the Menu"});
      }

      res.status(200).json(result);
    } catch (err) {
      ValidateToken.catchTokenErrors(res, err as Error);
    }
  }

  public async addMenuItem(req: Request, res: Response) {
    try {
      const adminId = await ValidateToken.validateToken(req);
      if(!adminId) return;

      const uploadedResponse = await cloudinaryConfig.uploader.upload(
        req.body.item_photo,
        {
          upload_preset: "food_booking",
        }
      );

      console.log(uploadedResponse);

      const result = await MenuItem.create({...req.body, item_photo: uploadedResponse});

      res.status(201).json(result);
    } catch (err) {
      ValidateToken.catchTokenErrors(res, err as Error);
    }
  }

  public async deleteMenuItem(req: Request, res: Response) {
    try {
      const adminId = await ValidateToken.validateToken(req);
      if(!adminId) return;

      const { _id } = req.query;
      
      const result = await MenuItem.deleteOne({ _id });

      res.status(200).json(result);
    } catch (err) {
      ValidateToken.catchTokenErrors(res, err as Error);
    }
  }
  
  public async updateMenuItem(req: Request, res: Response) {
    try {
      const adminId = await ValidateToken.validateToken(req);
      if(!adminId) return;

      const { _id } = req.query;
      
      const result = await MenuItem.updateOne({ _id }, req.body);

      res.status(200).json(result);
    } catch (err) {
      ValidateToken.catchTokenErrors(res, err as Error);
    }
  }
}

export const menuControllers = new MenuControllers();
