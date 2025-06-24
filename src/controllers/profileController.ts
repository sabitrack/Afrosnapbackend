import { Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'User profile', data: {} });
};

export const updateProfile = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Profile updated', data: {} });
}; 