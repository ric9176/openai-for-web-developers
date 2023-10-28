import OpenAI from 'openai';
import fs from 'fs';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Before fine tuning we need to create our data in jsonl format. I recommend using an LLM to get your data in the right format ;-) you can use the JSONL validator (https://jsonlines.org/validator/) or this more complete approach from the cookbook: https://cookbook.openai.com/examples/chat_finetuning_data_prep
// Docs: https://jsonlines.org/

// There is some example training data in fineTuneData.jsonl based on our use case of training the model to return structured JSON data as an output.
// Docs: https://platform.openai.com/docs/guides/fine-tuning/fine-tuning-examples

// First we need to upload a file for fine tuning:
await openai.files.create({
  file: fs.createReadStream('fineTuneData.jsonl'),
  purpose: 'fine-tune',
});
console.log('uploaded fine-tune');

// We can see our files by listing them, you can also check in the GUI of your account: https://platform.openai.com/files
const files = await openai.files.list();
console.log('🚀 ~ file: createModel.ts:15 ~ files:', files);

// We should select a file we want to use via it's ID. Then you can create a job. This may take some time, wait for the email!
const fineTune = await openai.fineTuning.jobs.create({
  training_file: 'file-4tFnR2RSOkfIjyu4QjnuS0It',
  model: 'gpt-3.5-turbo',
});
console.log('🚀 ~ file: createModel.mjs:21 ~ fineTune:', fineTune);

// You can see completed jobs and in progress jobs:
let jobs = await openai.fineTuning.jobs.list({ limit: 10 });
console.log('🚀 ~ file: createModel.mjs:23 ~ jobs:', jobs);
