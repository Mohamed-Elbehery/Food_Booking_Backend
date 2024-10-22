import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  date: Date;
  time: string;
  guests: number;
  tableId: number;
  status: "pending" | "accepted" | "rejected";
}

const BookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  tableId: { type: Number, required: true, min: 1, max: 6 },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
});

export default mongoose.model<IBooking>("Booking", BookingSchema);
