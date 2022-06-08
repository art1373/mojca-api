import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('mojca-api')
  .setDescription('Mojca ecommerce')
  .setVersion('1.0')
  .addTag('mojca/1.0')
  .build();

export const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
};
