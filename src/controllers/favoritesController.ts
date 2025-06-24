import { Request, Response } from 'express';

export const getFavorites = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Favorites list', data: [] });
};

export const addFavorite = async (req: Request, res: Response) => {
  res.status(201).json({ success: true, message: 'Added to favorites', data: {} });
};

export const removeFavorite = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Removed from favorites' });
}; 