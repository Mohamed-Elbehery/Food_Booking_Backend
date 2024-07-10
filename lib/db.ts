import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "../src";

dotenv.config();

const URI: string = process.env.DB_URI!;
const PORT = process.env.PORT || 3000;

class Database {
  private static instance: Database;
  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect() {
    try {
      await mongoose.connect(URI);
      console.log("Connected to Database Successfully");

      app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
      });
    } catch (e) {
      console.error("Failed to Connect to Database", e);
    }
  }
}

// Usage
export const dbInstance = Database.getInstance();
