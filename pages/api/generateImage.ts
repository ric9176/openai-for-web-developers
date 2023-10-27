import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the users prompt into a variable from the request

  // if (!prompt) {
  // Handle the case where no prompt was provided (same as /generateText)
  // }

  // Implement the users input from the frontend into the prompt for the industry and further improve

  //@ts-ignore
  const response = await openai.images.generate({
    // Enter your image generation config here to return a url to the image.
    // Reference guide: https://platform.openai.com/docs/guides/images/usage?lang=node.js
    // HINT: size '512x512' will be enough
    // Refernece Docs: https://platform.openai.com/docs/api-reference/images/create#images/create-response_format
  });

  const imageUrl = response.data[0].url;

  res.status(200).json({ image: imageUrl });
}
