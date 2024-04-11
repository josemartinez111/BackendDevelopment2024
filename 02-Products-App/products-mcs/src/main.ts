// FILE: main.ts
// _______________________________________________

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { envs } from "src/config/envs";
import { formattedHostAddress } from 'src/utilities/utils';
import { AppModule } from './app.module';

// _______________________________________________

async function bootstrap(): Promise<void> {
	// adding nestjs Logger
	const logger = new Logger('BOOTSTRAP<main.ts>');
	// Get the port from the environment variables
	const port = envs.port;
	
	// Create the Nest application instance
	const app = await NestFactory.create(AppModule);
	// Start the application on port 3000
	await app.listen(port);
	
	// Enable validation globally of all incoming requests
	app.useGlobalPipes(
		// Validate incoming data with the class-validator package
		new ValidationPipe({
			transform: true,
			// Automatically transform payloads to instances of the DTO classes
			whitelist: true,
			// Forbid non-allow listed properties in the DTO classes
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);
	
	const result = formattedHostAddress(port);
  logger.log(result);
}

// _______________________________________________

bootstrap().catch((err: unknown): void => {
	if (err instanceof Error)
		console.error('Error starting the server:', err.message);
	// Re-throw the error for further handling
	throw err;
})
// _______________________________________________
