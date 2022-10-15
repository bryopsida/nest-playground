import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ElasticAPM from 'elastic-apm-node';

const apm = ElasticAPM.start();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
