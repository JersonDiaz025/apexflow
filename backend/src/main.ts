import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const frontendUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
  const port = configService.get<number>('PORT') || 4000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  await app.listen(port);
  console.log(`Servidor corriendo en puerto :${port}`);
}
bootstrap();
