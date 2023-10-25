# OpenAI and Prompt Engineering for React Developers

Welcome to the "OpenAI and Prompt Engineering for React Developers" workshop! In this workshop, we will explore how to leverage OpenAI's capabilities within a React application, focusing particularly on prompt engineering techniques. Our project will be built using Next.js 13.

## Prerequisites

Before we get started, you'll need to set up an account with OpenAI and generate an API key:

1. Visit [OpenAI’s API keys page](https://platform.openai.com/account/api-keys).
2. Sign up for an account if you don’t have one already.
3. Once logged in, navigate to the API keys section and generate a new API key.
4. Securely save your API key; you will need it for the workshop.

## Getting Started

Follow these steps to set up your development environment:

### Step 1: Set Up Node.js

This project requires Node.js version 18. Use `nvm` to switch to the correct version:

```sh
nvm use
```

If you don’t have Node.js version 18 installed, `nvm` will prompt you to install it:

```sh
nvm install 18
```

### Step 2: Install Dependencies

Navigate to the project directory in your terminal, then run:

```sh
npm install
```

This command will install all the required dependencies.

### Step 3: Set Up Environment Variables

Create a .env.local file at the root of your project, and add your OpenAI API key:

```
OPENAI_API_KEY=your-api-key-here
```

Make sure to replace your-api-key-here with the actual API key you generated.

### Step 4: Run the Project

Start the development server with:

```sh
npm run dev
```

### Resources

- Next.js Documentation
- OpenAI API Documentation

# Exercise Instructions

## Exercise 1: Startup Idea Generator via the API

### Part 1: OpenAI API Integration

0. Check your API keys are working, go to http://localhost:3000/api/example and you should see the available models in the data returned. TIP: use [JSON formatter extension](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?utm_source=ext_sidebar&hl=en-US) if you don't already!
1. In /pages/api/generateText Implement the OpenAI API in a NextJS serverless function. You should see your ouput at localhost:3000/api/generateText
2. Craft a prompt that generates startup ideas. Try getting it to return a completion that includes:
   - Product Name
   - Idea
   - Mission
   - Unique Selling Points (USPs)
   - Remember, you can also use the [playground](https://platform.openai.com/playground)
3. Analyze the API response:
   - Note how many tokens your prompt is using.
   - Explore ways to improve the response with best practice prompting.
   - Investigate whether changing the model and hyperparameters makes a significant difference.
   - Remember, you can also use the [playground](https://platform.openai.com/playground)
4. **Bonus**: In /pages/api/generateImage start experimenting with the images endpoint in the
   OpenAI API. Use your prompting knowledge to generate an image for a given startup idea.

### Part 2: Integrate User Input

0. Navigate to http://localhost:3000/ideaGenerator. This is the page we'll implement
1. Utilize `pages/api/generateText.ts` for server-side implementation. You should expect an input to be passed on the request from the client and then use this in your prompt.
   HINT: check out the code comments in that file!
2. Implement your frontend in `ideaGenerator/page.tsx`, you'll need to make a POST request to the endpoint at `pages/api/generateText` that contains the user input to be passed into the prompt.

### Part 3: Image Generation

1. Further develop a prompt for generating an image based on the user input in `pages/api/generateImage.ts`.
2. You will receive a URL in response, where you can view the generated image.
3. Integrate the image generation functionality into your startup idea generator in `ideaGenerator/page.tsx`.

## Exercise 2: Working with Structured Data

### Part 1: Generate Structured Data

1. In `/pages/api/GenerateData` Implement your existing prompt along with a shape (schema) for the JSON you want the LLM to return. The data should include a product, idea, mission and a list of unique selling points, feel free to add more things! Check the code comments for hints.
2. Complete the implemetation of the frontend in `ideaGeneratorStructured/page.tsx`.
3. **Bonus**: Explore using Zod for your schema creation and validation with zodToJsonSchema, passing the LLM a JSON schema works well. This is also the approach taken by the [output parser from langchain](https://js.langchain.com/docs/modules/model_io/output_parsers/structured#structured-output-parser-with-zod-schema). You could try implementing your own or try using their output parser.

## Exercise 4: Implement Streaming for Better User Experience

### Part 1: Text Streaming with Vercel's openai-stream

Note: We will use the Next13 app router for this section

1. Go to `src/app/api/completion/route.ts`. Implement text streaming on the server to generate a startup idea to enhance the user experience. Vercel has made it super simple, follow the docs: https://sdk.vercel.ai/docs/api-reference/openai-stream
2. Go to `src/app/streamingText/page.ts`. Implement the utility hook useCompletion in the UI and ensure it's working, see the code comments and use the docs: https://sdk.vercel.ai/docs/api-reference/use-completion#usecompletion

### Bonus: Streaming JSON

1. Assuming your streaming text is working, make a slight refactor so that it returns a JSON object as we did in the previous exercise
2. Now we would like to stream that JSON for better UX, luckily as this is a common problem there is another little helper libary we can use called http-streaming-request. Explore and implement JSON streaming using the [http-streaming-request library](https://github.com/mikeborozdin/http-streaming-request).

---

Feel free to reach out for support or clarification as you work through these exercises. Happy coding!
