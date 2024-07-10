import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  total_person: {
    type: Number,
    required: true,
  },
  choosen_date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phone_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["accepted", "rejected"],
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;