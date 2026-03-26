import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgres',
      // Додаємо || '5432', щоб прибрати помилку TS2345
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER || 'nestuser',
      password: process.env.POSTGRES_PASSWORD || 'nestpassword',
      database: process.env.POSTGRES_DB || 'nestdb',
      entities: [],
      synchronize: true, // тільки для розробки!
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}