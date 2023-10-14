'use client'

import { useCompletion } from 'ai/react'
import { useJsonStreaming } from "http-streaming-request";

export default function StreamJson() {

  const { completion, input, handleInputChange, handleSubmit } = useCompletion();


  const { data } = useJsonStreaming({
    url: "/api/example",
    method: "GET",
  });
  console.log("🚀 ~ file: page.tsx:16 ~ SloganGenerator ~ data:", data)


  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={handleSubmit}>
        <input
          className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 dark:text-black"
          value={input}
          placeholder="Describe your business..."
          onChange={handleInputChange}
        />
      </form>
      <div className="whitespace-pre-wrap my-6">{data && data.product}</div>
    </div>
  );
}