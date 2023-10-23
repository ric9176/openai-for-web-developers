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

1. Implement the OpenAI API in a NextJS serverless function.
2. Craft a prompt that generates startup ideas. Ensure it returns:
   - Product Name
   - Idea
   - Mission
   - Unique Selling Points (USPs)
3. Analyze the API response:
   - Calculate how many tokens your prompt is using.
   - Explore ways to improve the response with best practice prompting.
   - Investigate whether changing the model makes a significant difference.
4. **Bonus**: Start experimenting with the images endpoint in the OpenAI API.

### Part 2: Integrate User Input

1. Utilize `pages/api/generateText` for server-side logic, where you will find hints for integrating input from an incoming request.
2. Implement your frontend logic in `ideaGenerator/page.tsx`, and look for hints to guide your integration.

## Exercise 2: Prompt Engineering and Image Generation

### Part 1: Prompt Engineering for Images

1. Develop a prompt for generating relevant images in `pages/api/generateImage.ts`.
2. You will receive a URL in response, where you can view the generated image.

### Part 2: Frontend Integration

1. Integrate the image generation functionality into your startup idea generator in `ideaGenerator/page.tsx`.

## Exercise 3: Working with Structured Data

### Part 1: Generate Structured Data

1. Modify your prompts to make the AI return structured data (JSON) for easier UI layout.
2. **Bonus**: Implement multishot prompting to improve results.
3. **Bonus**: Explore output parsing using Zod for structured and validated data handling.

## Exercise 4: Implement Streaming for Better User Experience

### Part 1: Text Streaming

1. Implement text streaming in your application to enhance the user experience.

### Part 2: Advanced Streaming (Bonus)

1. **Bonus**: Explore and implement JSON streaming using Mike's library for advanced real-time data handling.

---

Feel free to reach out for support or clarification as you work through these exercises. Happy coding!
