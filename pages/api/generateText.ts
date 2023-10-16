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

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `Write a creative startup idea to disrupt the industry deliminated by { }, 100 words maximum, {${prompt}}` }],
    model: "gpt-3.5-turbo",
  });

  // const availableModels = await openai.models.list()
  const completionText = chatCompletion.choices[0].message.content
  // console.log(completionText)

  res.status(200).json({ data: completionText })
}