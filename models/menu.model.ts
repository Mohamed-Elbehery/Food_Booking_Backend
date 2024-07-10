import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
  item_photo: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Breakfast", "Main Dishes", "Drinks", "Desserts"]
  },
});

const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);

export default MenuItem;
