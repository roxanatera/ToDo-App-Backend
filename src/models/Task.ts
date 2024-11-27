import mongoose, { Schema, Document } from "mongoose";

// Define la interfaz para la tarea
export interface ITask extends Document {
  title: string;
  description: string;
  userId: mongoose.Types.ObjectId;  // Relacionamos las tareas con el usuario mediante su ID
  createdAt: Date;
  updatedAt: Date;
}

// Definimos el esquema de la tarea
const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Asegúrate de que el campo `userId` sea obligatorio
  },
  {
    timestamps: true,  
  }
);

// Exportamos el modelo de la tarea
export default mongoose.model<ITask>("Task", TaskSchema);
