import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Here we need to extract the prompt from the request body into a variable

  if (!prompt) {
    // Here we should return a 404 with an error message if there is no prompt
  }

  const chatCompletion = 
  // Here we need to use openai.chat.completions along with our chosen settings and prompt to return the completion 


  // Extract the part of the response we are interested in and respond with a 200 and the data
  // Have a look at the implementation in example.ts 
  
}
