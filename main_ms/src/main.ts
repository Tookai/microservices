import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/main');
  app.enableCors();
  app.use(helmet());
  await app.listen(5500);

  logger.log('===> Application is running on port 5500 <===');
}
bootstrap();
