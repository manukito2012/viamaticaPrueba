import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir para el frontend Angular ruta
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  });
  /* app.enableCors();  */

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
