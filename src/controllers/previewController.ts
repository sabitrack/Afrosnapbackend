import { Request, Response } from 'express';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

export const generatePreview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ success: false, message: 'Prompt is required.' });
      return;
    }

    // Call OpenAI DALL·E API to generate an image
    const response = await axios.post<{ data: { url: string }[] }>(
      'https://api.openai.com/v1/images/generations',
      {
        prompt,
        n: 1,
        size: '512x512',
        response_format: 'url'
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const imageUrl = response.data.data[0]?.url;
    if (!imageUrl) {
      res.status(500).json({ success: false, message: 'Failed to generate image.' });
      return;
    }

    res.status(200).json({ success: true, message: 'Preview generated', data: { imageUrl } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error generating preview', error: error.message });
  }
}; 