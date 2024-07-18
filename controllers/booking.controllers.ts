import { type Request, type Response } from "express";
import Booking from "../models/booking.model";
import { ValidateToken } from "../utils/validateToken";

export class BookingControllers {
  public constructor() {}

  public async getBookings(req: Request, res: Response) {
    try {
      await ValidateToken.validateToken(req);

      const result = await Booking.find({});

      res.status(200).json(result);
    } catch (err) {
      return ValidateToken.catchTokenErrors(res, err as Error);
    }
  }

  public async getBookingByID(req: Request, res: Response) {
    try {
      await ValidateToken.validateToken(req);

      const { _id } = req.query;

      const booking = await Booking.findById(_id);

      if (!booking) {
        res
          .status(404)
          .json({ message: "There is no booking with this ID" });
      }

      res.status(200).json(booking);
    } catch (err) {
      return ValidateToken.catchTokenErrors(res, err as Error);
    }
  }

  public async addBooking(req: Request, res: Response) {
    try {
      const result = await Booking.create(req.body);

      res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ message: "Bad Request!" });
    }
  }

  public async changeBookingStatus(req: Request, res: Response) {
    try {
      await ValidateToken.validateToken(req);

      const { _id } = req.query;

      const result = await Booking.updateOne({ _id }, { status: "accepted" });

      res.status(200).json(result);
    } catch (err) {
      return ValidateToken.catchTokenErrors(res, err as Error);
    }
  }
}

export const bookingControllers = new BookingControllers();
