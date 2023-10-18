import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAIA_ORG,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = JSON.parse(req.body);

  if (!prompt) {
    return res.status(400).json({ error: 'requiredParam "prompt" is missing' });
  }

  const response = await openai.images.generate({
    prompt: `An impressionist oil painting that represents an innovative ${prompt} business in action with customers`,
    n: 1,
    size: '512x512',
    response_format: 'url', // url expires after 1 hour
  });

  // Reference docs: https://platform.openai.com/docs/guides/images/usage?lang=node.js

  const imageUrl = response.data[0].url;

  res.status(200).json({ image: imageUrl });
}
