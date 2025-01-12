import { NestFactory } from '@nestjs/core';
import { Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { HttpResponseInterceptor, HttpExceptionFilter } from '@common/http';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { SwaggerConfig } from '@config';
import helmet from 'helmet';
import { ValidationError } from 'class-validator';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.enableVersioning();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  // Set global ValidationPipe with custom error messages
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTOs
      whitelist: true, // Automatically strip properties that do not have decorators
      forbidNonWhitelisted: false, // Throw an error if non-whitelisted properties are provided
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
          message: Object.values(error.constraints || {}).join(', '),
        }))
        throw new UnprocessableEntityException(formattedErrors);
      },
    }),
  );

  app.setGlobalPrefix(AppModule.apiPrefix);
  SwaggerConfig(app, AppModule.apiVersion);
  await app.listen(AppModule.port);
  return AppModule.port;
};

bootstrap().then((port: number) => {
  Logger.log(`Application running on port: ${port}`, 'Main');
});
