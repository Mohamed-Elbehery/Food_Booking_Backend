import { bookingControllers } from "../controllers/booking.controllers";
import express from "express";

export const bookingRouter = express.Router();

/**
 * @openapi
 * /bookings/get-all-bookings:
 *  get:
 *    tags:
 *      - Bookings
 *    summary: Get all bookings
 *    description: Retrieve a list of all bookings. Requires authentication.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: A list of bookings
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Booking'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
bookingRouter.get("/get-all-bookings", bookingControllers.getBookings);

/**
 * @openapi
 * /bookings/get-booking:
 *  get:
 *    tags:
 *      - Bookings
 *    summary: Get booking by ID
 *    description: Retrieve a specific booking by its ID. Requires authentication.
 *    security:
 *      - bearerAuth: []
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
 *              $ref: '#/components/schemas/Booking'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: Booking not found
 */
bookingRouter.get("/get-booking", bookingControllers.getBookingByID);

/**
 * @openapi
 * /bookings/add-booking:
 *  post:
 *    tags:
 *      - Bookings
 *    summary: Add a new booking
 *    description: Create a new booking
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BookingInput'
 *    responses:
 *      201:
 *        description: Booking added successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 *      400:
 *        description: Bad request
 */
bookingRouter.post("/add-booking", bookingControllers.addBooking);

/**
 * @openapi
 * /bookings/change-status:
 *  patch:
 *    tags:
 *      - Bookings
 *    summary: Change the status of a booking
 *    description: Update the status of an existing booking. Requires admin authentication.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the booking
 *    responses:
 *      200:
 *        description: Booking status updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                acknowledged:
 *                  type: boolean
 *                modifiedCount:
 *                  type: number
 *                upsertedId:
 *                  type: string
 *                upsertedCount:
 *                  type: number
 *                matchedCount:
 *                  type: number
 *      400:
 *        description: Bad request
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: Booking not found
 */
bookingRouter.patch("/change-status", bookingControllers.changeBookingStatus);

/**
 * @openapi
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         total_person:
 *           type: number
 *         choosen_date:
 *           type: string
 *           format: date
 *         user:
 *           type: string
 *         phone_number:
 *           type: string
 *         status:
 *           type: string
 *           enum: [accepted, pending, rejected]
 *           default: pending
 *         time:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *     BookingInput:
 *       type: object
 *       required:
 *         - total_person
 *         - choosen_date
 *         - user
 *         - phone_number
 *         - time
 *       properties:
 *         total_person:
 *           type: number
 *         choosen_date:
 *           type: string
 *           format: date
 *         user:
 *           type: string
 *         phone_number:
 *           type: string
 *         time:
 *           type: string
 *           format: date-time
 *     AvailableTable:
 *       type: object
 *       properties:
 *         tableNumber:
 *           type: number
 *         capacity:
 *           type: number
 */

/**
 * @openapi
 * /bookings/available-tables:
 *  get:
 *    tags:
 *      - Bookings
 *    summary: Get available tables
 *    description: Retrieve a list of available tables for a specific date and time.
 *    parameters:
 *      - in: query
 *        name: date
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: The date for which to check table availability (YYYY-MM-DD)
 *      - in: query
 *        name: time
 *        required: true
 *        schema:
 *          type: string
 *          format: time
 *        description: The time for which to check table availability (HH:mm)
 *    responses:
 *      200:
 *        description: A list of available tables
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  tableNumber:
 *                    type: number
 *                  capacity:
 *                    type: number
 *      400:
 *        description: Bad request - Invalid date or time format
 *      500:
 *        description: Internal server error
 */
bookingRouter.get("/available-tables", bookingControllers.getAvailableTables);
