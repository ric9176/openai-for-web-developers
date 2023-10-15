import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAIA_ORG
});

const shape = {
  product: "string",
  idea: "string",
  mission: "string",
  uniqueSellingPoints: ["string", "string"]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = JSON.parse(req.body)

  const ideaAttributes = await openai.chat.completions.create({
    messages: [{
      role: "user", content: `A unique startup idea to disrupt: ${prompt}, There should be a product, idea, mission and an array of 5 unique selling points, no more than 100 words each, 
      
    Return the response as a JSON object with a shape of ${shape}`
    }],
    model: "gpt-3.5-turbo",
  });

  const completionText = JSON.parse(ideaAttributes.choices[0].message.content as string)

  res.status(200).json({ data: completionText })
}