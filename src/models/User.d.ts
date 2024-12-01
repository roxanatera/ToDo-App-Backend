import mongoose, { Document } from "mongoose";
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
