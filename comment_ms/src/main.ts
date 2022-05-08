import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 5550,
    },
  });
  app.setGlobalPrefix('/api/comment');
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(5550);

  logger.log('===> Post Microservice is listening on port 5550 <===');
}
bootstrap();
