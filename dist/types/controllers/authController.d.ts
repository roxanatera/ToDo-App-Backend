import { Request, Response } from "express";
interface CustomRequest extends Request {
    user?: {
        id: string;
    };
}
export declare const registerUser: (req: Request, res: Response) => Promise<void>;
export declare const loginUser: (req: Request, res: Response) => Promise<void>;
export declare const getCurrentUser: (req: CustomRequest, res: Response) => Promise<void>;
export {};
