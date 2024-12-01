import { Request, Response } from "express";
export declare const createTask: (req: Request, res: Response) => Promise<void>;
export declare const getTasks: (req: Request, res: Response) => Promise<void>;
export declare const updateTask: (req: Request, res: Response) => Promise<void>;
export declare const deleteTask: (req: Request, res: Response) => Promise<void>;
