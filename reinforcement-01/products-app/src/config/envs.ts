// FILE: config/envs.ts
// _______________________________________________

import 'dotenv/config';
import * as joi from 'joi';
// _______________________________________________


// Validate against a schema
const envsSchema = joi.object({
  PORT: joi.number().required(),
})
  .unknown(true); // Allow unknown keys

const { error, value: validatedEnv } = envsSchema.validate(process.env);
const envVars: { PORT: number } = validatedEnv;
console.log("\n\nWhat type is the PORT:", typeof envVars.PORT, "\n\n");

if (error) {
  throw new Error(`Config validation error: ${ error.message }`);
}
// _______________________________________________


export const envs = {
  port: envVars.PORT,
};
// _______________________________________________














