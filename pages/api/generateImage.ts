import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAIA_ORG
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = JSON.parse(req.body)

  if (!prompt) {
    return res.status(400).json({ error: 'requiredParam "prompt" is missing' });
  }

  const response = await openai.images.generate({
    prompt: `create an image that represents a business in the ${prompt} in action with customers`,
    n: 1,
    size: "512x512",
  });
  const imageUrl = response.data[0].url
  // console.log("🚀 ~ file: generateImage.ts:18 ~ handler ~ imageUrl:", imageUrl)

  res.status(200).json({ image: imageUrl })
}