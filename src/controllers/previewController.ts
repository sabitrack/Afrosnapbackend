import { Request, Response } from 'express';

export const generatePreview = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Preview generated', data: {} });
}; 