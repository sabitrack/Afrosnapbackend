import { Request, Response } from 'express';

export const getExploreItems = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Explore items', data: [] });
}; 