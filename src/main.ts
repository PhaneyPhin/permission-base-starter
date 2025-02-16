import { HttpExceptionFilter, HttpResponseInterceptor } from "@common/http";
import { SwaggerConfig } from "@config";
import {
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ValidationError } from "class-validator";
import * as compression from "compression";
import helmet from "helmet";
import { AppModule } from "./app.module";

const formatValidationErrors = (errors: ValidationError[]) => {
  return errors.map((error) => {
    const formattedError: any = {
      property: error.property,
      constraints: error.constraints,
      message: Object.values(error.constraints || {}).join(", "),
    };

    if (error.children && error.children.length > 0) {
      formattedError.children = formatValidationErrors(error.children); // Recursive handling of nested errors
    }

    return formattedError;
  });
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.enableVersioning();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());

  // Set global ValidationPipe with enhanced error formatting
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTOs
      whitelist: true, // Strip properties that do not have decorators
      forbidNonWhitelisted: false, // Throw an error if non-whitelisted properties are provided
      exceptionFactory: (errors: ValidationError[]) => {
        throw new UnprocessableEntityException(formatValidationErrors(errors));
      },
    })
  );

  app.setGlobalPrefix(AppModule.apiPrefix);
  SwaggerConfig(app, AppModule.apiVersion);
  await app.listen(AppModule.port);
  return AppModule.port;
};

bootstrap().then((port: number) => {
  Logger.log(`Application running on port: ${port}`, "Main");
});
