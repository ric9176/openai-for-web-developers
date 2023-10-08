import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAIA_ORG
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });

  const availableModels = await openai.models.list()

  res.status(200).json({ data: availableModels })
}