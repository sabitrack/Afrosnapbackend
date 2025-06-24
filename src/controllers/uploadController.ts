import { Request, Response } from 'express';

export const uploadFile = async (req: Request, res: Response) => {
  res.status(201).json({ success: true, message: 'File uploaded', file: req.file });
}; 