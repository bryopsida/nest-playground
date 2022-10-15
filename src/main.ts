import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as elastic from 'elastic-apm-node';

const apm = elastic.start();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
