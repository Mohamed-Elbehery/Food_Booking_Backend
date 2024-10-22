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
      const { tableId, date, time } = req.body;

      // Check if the table is already booked for the given date and time
      const existingBooking = await Booking.findOne({
        tableId,
        date,
        time,
        status: { $in: ["pending", "accepted"] },
      });

      if (existingBooking) {
        return res.status(400).json({ message: "This table is already booked for the selected date and time." });
      }

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

  public async getAvailableTables(req: Request, res: Response) {
    try {
      await ValidateToken.validateToken(req);

      const { date, time } = req.query;

      if (!date || !time) {
        return res.status(400).json({ message: "Date and time are required." });
      }

      const bookedTables = await Booking.find({
        date,
        time,
        status: { $in: ["pending", "accepted"] },
      }).distinct("tableId");

      const availableTables = Array.from({ length: 6 }, (_, i) => i + 1).filter(
        (tableId) => !bookedTables.includes(tableId)
      );

      res.status(200).json({ availableTables });
    } catch (err) {
      return ValidateToken.catchTokenErrors(res, err as Error);
    }
  }
}

export const bookingControllers = new BookingControllers();
