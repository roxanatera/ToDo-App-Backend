import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://root_app:todo_app@cluster0.iahb0.mongodb.net/todoApp?retryWrites=true&w=majority"
    );
    console.log(colors.bold.green("MongoDB conectado"));
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1); // Finaliza el proceso si no puede conectar
  }
};

export default connectDB;
