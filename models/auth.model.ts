import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validator: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    profile_img: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["normal", "admin"],
      default: "normal",
    },
  },
  {
    statics: {
      login: async function (email: string, password: string) {
        const user = await this.findOne({ email });
        if (user) {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
            return user;
          }
          throw new Error("Incorrect Password");
        }
        throw new Error("Incorrect Email");
      },
    },
  }
);

// Fire a function before doc saved to db
UserSchema.pre("save", async function (next) {
  // Generating the Salt
  const salt = await bcrypt.genSalt();

  // Hashing the password and adding the salt to it
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// UserSchema.statics.login = async function (email: string, password: string): Promise<IUser> {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw new Error('Incorrect Password');
//   }
//   throw new Error('Incorrect Email');
// };

const User = mongoose.model("User", UserSchema);

export default User;
