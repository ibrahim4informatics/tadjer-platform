import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Tadjer Plateform API')
    .setDescription('API for the Tadjer Plateform')
    .setVersion('1.0')
    .addTag('tadjer')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, documentFactory);

  const port = process.env.PORT ?? 5000;
  const url =
    process.env.URL ??
    `http://localhost:5000/${process.env.API_PREFIX ?? 'api/v1'}`;
  await app.listen(port, async () => {
    Logger.log(`Server is running on port ${url}`, 'Bootstrap');
  });
}
bootstrap();
