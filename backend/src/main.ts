import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_NAME, SCHEMA_FILE, SWAGGER_URL } from './configuration/app.config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync(SCHEMA_FILE, JSON.stringify(document));
  SwaggerModule.setup(SWAGGER_URL, app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
