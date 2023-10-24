import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAIA_ORG,
});

// Create a shape object (schema) for the structured data you want returned. Your schema should have a product, idea, mission and a list of unique selling points. HINT: Look at the interface in ideaGeneratorStructured/page.ts

// You can use JSON.stringify when adding this in the prompt.

// This is the most simplistic approach, bear in mind that JSON schema is also well understood by the LLM!
const shape = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the prompt and handle no prompt being passed as in the previous excercise

  // Implement the chat completion API here and craft a prompt that takes in the user input and returns JSON in the shape specified

  // As we are builing a custom API, we should parse the output on the server, for example:
  const data = JSON.parse(completion.choices[0].message.content as string);
  // Bonus: Add further error handling, what if they JSON.parse fails? You could make the API call again..

  res.status(200).json({ data });
}
