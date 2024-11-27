import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/todoApp");
    console.log(colors.bold.green("MongoDB conectado"));
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1); // Finaliza el proceso si no puede conectar
  }
};

export default connectDB;
