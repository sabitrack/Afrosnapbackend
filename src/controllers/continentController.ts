import { Request, Response } from 'express';

export const getAllContinents = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'All continents', data: [] });
};

export const getContinentById = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Continent by ID', data: {} });
}; 