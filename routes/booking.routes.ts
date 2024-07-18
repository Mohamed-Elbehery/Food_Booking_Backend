import { bookingControllers } from "../controllers/booking.controllers";
import express from "express";

export const bookingRouter = express.Router();

/**
 * @openapi
 * /bookings/get-all-bookings:
 *  get:
 *    tags:
 *      - Bookings
 *    description: Get all bookings
 *    responses:
 *      200:
 *        description: A list of bookings
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  total_person:
 *                    type: number
 *                  choosen_date:
 *                    type: string
 *                    format: date
 *                  user:
 *                    type: string
 *                  phone_number:
 *                    type: string
 *                  status:
 *                    type: string
 *                    enum: ["accepted", "pending", "rejected"]
 *                    default: "pending"
 *                  time:
 *                    type: string
 *                    format: date-time
 *                  updatedAt:
 *                    type: string
 *                    format: date-time
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *      400:
 *        description: Bad Request
 */
bookingRouter.get("/get-all-bookings", bookingControllers.getBookings);

/**
 * @openapi
 * /bookings/get-booking:
 *  get:
 *    tags:
 *      - Bookings
 *    description: Get booking by ID
 *    parameters:
 *      - in: query
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the booking
 *    responses:
 *      200:
 *        description: A single booking
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                total_person:
 *                  type: number
 *                choosen_date:
 *                  type: string
 *                  format: date
 *                user:
 *                  type: string
 *                phone_number:
 *                  type: string
 *                status:
 *                  type: string
 *                  enum: ["accepted", "pending", "rejected"]
 *                  default: "pending"
 *                time:
 *                  type: string
 *                  format: date-time
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *      400:
 *        description: Bad Request
 */
bookingRouter.get("/get-booking", bookingControllers.getBookingByID);

/**
 * @openapi
 * /bookings/add-booking:
 *  post:
 *    tags:
 *      - Bookings
 *    description: Add a new booking
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              total_person:
 *                type: number
 *              choosen_date:
 *                type: string
 *                format: date
 *              user:
 *                type: string
 *              phone_number:
 *                type: string
 *              time:
 *                type: string
 *                format: date-time
 *    responses:
 *      200:
 *        description: Booking added
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                total_person:
 *                  type: number
 *                choosen_date:
 *                  type: string
 *                  format: date
 *                user:
 *                  type: string
 *                phone_number:
 *                  type: string
 *                status:
 *                  type: string
 *                time:
 *                  type: string
 *                  format: date-time
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *      400:
 *        description: Bad Request
 */
bookingRouter.post("/add-booking", bookingControllers.addBooking);

/**
 * @openapi
 * /bookings/change-status:
 *  patch:
 *    tags:
 *      - Bookings
 *    description: Change the status of a booking
 *    parameters:
 *      - in: query
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the booking
 *    responses:
 *      200:
 *        description: Booking status updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                total_person:
 *                  type: number
 *                choosen_date:
 *                  type: string
 *                  format: date
 *                user:
 *                  type: string
 *                phone_number:
 *                  type: string
 *                status:
 *                  type: string
 *                  enum: ["accepted", "pending", "rejected"]
 *                  default: "accepted"
 *                time:
 *                  type: string
 *                  format: date-time
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *      400:
 *        description: Bad Request
 *      404:
 *        description: User not found
 */
bookingRouter.patch("/change-status", bookingControllers.changeBookingStatus);
