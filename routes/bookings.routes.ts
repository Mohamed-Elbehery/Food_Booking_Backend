import { bookingControllers } from "../controllers/booking.controllers";
import express from "express";
export const bookingsRouter = express.Router();

bookingsRouter
  .get("/", bookingControllers.getBookings)
  .get("/booking", bookingControllers.getBookingByID)
  .post("/", bookingControllers.addBooking)
  .patch("/", bookingControllers.changeBookingStatus);
