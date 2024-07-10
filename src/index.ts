import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { dbInstance } from "../lib/db";
import { menuRouter } from "../routes/menu.routes";
import { bookingsRouter } from "../routes/bookings.routes";
import { authRouter } from "../routes/auth.routes";

dotenv.config();

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

dbInstance.connect();

app.use(morgan("dev"));

app.use("/menu", menuRouter);
app.use("/bookings", bookingsRouter);
app.use("/auth", authRouter);
