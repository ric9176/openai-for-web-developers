import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAIA_ORG
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = JSON.parse(req.body)

  const response = await openai.images.generate({
    prompt: "a software engineer experiencing a hallucination",
    n: 1,
    size: "512x512",
  });
  const imageUrl = response.data[0].url

  res.status(200).json({ data: imageUrl })
}