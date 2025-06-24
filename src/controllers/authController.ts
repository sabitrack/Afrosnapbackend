import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  res.status(201).json({ success: true, message: 'User registered', data: {} });
};

export const login = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'User logged in', token: 'jwt-token', data: {} });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'User logged out' });
};

export const getMe = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'User profile', data: {} });
}; 