import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './global-exception';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // For Global EXception handling
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions:{
        enableImplicitConversion:true,
      }
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJs - Covid Data use database API')
    .setDescription('Use the base API URL as http://localhost:3300')
    .addServer('http://localhost:3300')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3300);
}
bootstrap();
