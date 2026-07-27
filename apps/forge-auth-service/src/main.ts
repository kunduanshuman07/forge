import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api/v1/forge-auth');

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Forge Auth Service')
    .setDescription('Authentication Service APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);

  logger.log(
    `🚀 Forge Auth Service is running on http://localhost:${port}/api/v1/forge-auth`,
  );
}

bootstrap();