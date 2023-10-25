import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: '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',
});

// await openai.files.create({
//   file: fs.createReadStream('fineTuneData.jsonl'),
//   purpose: 'fine-tune',
// });
// console.log('uploaded fine-tune');

const files = await openai.files.list();
console.log('🚀 ~ file: createModel.ts:15 ~ files:', files);

// const fineTune = await openai.fineTuning.jobs.create({
//   training_file: 'file-4tFnR2RSOkfIjyu4QjnuS0It',
//   model: 'gpt-3.5-turbo',
// });
// console.log('🚀 ~ file: createModel.mjs:21 ~ fineTune:', fineTune);

let jobs = await openai.fineTuning.jobs.list({ limit: 10 });
console.log('🚀 ~ file: createModel.mjs:23 ~ jobs:', jobs);
