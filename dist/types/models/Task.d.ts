import mongoose, { Document } from "mongoose";
export interface ITask extends Document {
    title: string;
    description: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask> & ITask & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
