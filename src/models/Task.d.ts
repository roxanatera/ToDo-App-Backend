import mongoose, { Document } from "mongoose";
interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    user: mongoose.Schema.Types.ObjectId;
}
declare const _default: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask> & ITask & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
