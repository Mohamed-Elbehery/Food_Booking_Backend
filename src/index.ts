import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from 'cors';
import { dbInstance } from "../lib/db";
import { menuRouter } from "../routes/menu.routes";
import { bookingRouter } from "../routes/booking.routes";
import { authRouter } from "../routes/auth.routes";

dotenv.config();

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// parse application/json
app.use(bodyParser.json());

dbInstance.connect();

app.use(morgan("dev"));

app.use("/menu", menuRouter);
app.use("/bookings", bookingRouter);
app.use("/auth", authRouter);
