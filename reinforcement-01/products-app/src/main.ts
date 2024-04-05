// FILE: main.ts
// _______________________________________________

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { envs } from 'src/config/envs';
import { AppModule } from './app.module';

// _______________________________________________

async function bootstrap(): Promise<void> {
  // Get the port from the environment variables
  const port = envs.port;
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);
  // Set the global prefix for all routes with the /api prefix
  app.setGlobalPrefix('api');
  
  // Enable validation globally of all incoming requests
  app.useGlobalPipes(
    // Validate incoming data with the class-validator package
    new ValidationPipe({
      // Automatically transform payloads to instances of the DTO classes
      whitelist: true,
      // Forbid non-allow listed properties in the DTO classes
      forbidNonWhitelisted: true,
    }),
  );
  
  await app.listen(port);
  console.log(`\n\nServer is running on http://localhost:${ port }\n\n`);
}

// ________________________________________________

bootstrap().catch((err: unknown): void => {
  if (err instanceof Error)
    console.error('Error starting the server:', err.message);
  // Re-throw the error for further handling
  throw err;
});
// _______________________________________________
