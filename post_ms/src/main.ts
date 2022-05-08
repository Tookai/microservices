import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger()

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 5555,
    },
  });
  app.setGlobalPrefix('/api/post');
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(5555);

  logger.log('===> Post Microservice is listening on port 5555 <===');
}
bootstrap();
