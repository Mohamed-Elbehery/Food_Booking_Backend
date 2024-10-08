import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  total_person: {
    type: String,
    required: true,
  },
  choosen_date: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["accepted", "pending", "rejected"],
    required: true,
    default: "pending",
  },
  time: {
    type: String,
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

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
