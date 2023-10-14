import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const shape = {
    product: "string",
    idea: "string",
    mission: "string",
  }
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{
      role: 'user', content: `A unique startup idea to disrupt: ${prompt}, 
    There should be a product, idea, and mission, no more than 150 words each, 
    Return the response as a JSON object with a shape of ${shape}`
    }]
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}