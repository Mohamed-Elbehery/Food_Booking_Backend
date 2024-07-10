import { type Request, type Response } from "express";
import Booking from "../models/booking.model";

export class BookingControllers {
  public constructor() {}

  public async getBookings(_: Request, res: Response) {
    try {
      const result = await Booking.find({});

      res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async getBookingByID(req: Request, res: Response) {
    try {
      const { _id } = req.query;

      const result = await Booking.findById(_id);

      res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async addBooking(req: Request, res: Response) {
    try {
      const result = await Booking.create(req.body);

      res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async changeBookingStatus(req: Request, res: Response) {
    try {
      const { _id } = req.query;

      const result = await Booking.updateOne({ _id }, req.body);

      res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export const bookingControllers = new BookingControllers();
