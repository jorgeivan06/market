import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para que el frontend pueda conectarse
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Forzar a escuchar en todas las interfaces para evitar problemas de localhost [::1] vs 127.0.0.1
  await app.listen(3001, '0.0.0.0'); 
  console.log(`Application is running on: http://localhost:3001`);
}
bootstrap();
