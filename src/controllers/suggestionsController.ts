import { Request, Response } from 'express';

export const getSuggestions = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'AI suggestions', data: [] });
}; 