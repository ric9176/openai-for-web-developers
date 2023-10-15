import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAIA_ORG
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `generate a unique startup idea` }],
    model: "gpt-3.5-turbo",
  });

  const availableModels = await openai.models.list()
  const completionText = chatCompletion.choices[0].message.content
  // console.log(completionText)

  res.status(200).json({ data: completionText })
}