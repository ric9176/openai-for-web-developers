// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const greeting = "Hello World!!"
//   const json = {
//     greeting
//   };

//   return NextResponse.json(json);
// } 
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = 'edge';

const shape = {
  product: "string",
  idea: "string",
  mission: "string",
}

export async function GET(req: Request) {

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{
      role: 'user', content: `A unique startup idea to disrupt: travel, 
      There should be a product, idea, and mission, no more than 150 words each, 
      Return the response as a JSON object with a shape of ${shape}`
    }]
  });

  // Respond with the stream
  return new StreamingTextResponse(OpenAIStream(response));
}