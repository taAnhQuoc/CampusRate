import { Module } from '@nestjs/common';
import { PlaceModule } from './place/place.module.js';
import { RatingModule } from './rating/rating.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config.js';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JsonContentTypeGuard } from './commun/json-content-type-guard.js';
import { AuthModule } from './auth/auth.module.js';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        load: [databaseConfig],
        validationSchema: Joi.object({
          MONGO_DOMAIN: Joi.string().required(),
          MONGO_USERNAME: Joi.string().required(),
          MONGO_PASSWORD: Joi.string().required(),
          MONGO_DB: Joi.string().required(),
          PORT: Joi.number().default(3000),
        }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      // Récupération typée et sécurisée
        uri: configService.get<string>('database.uri'),
        // Options de production recommandées
        autoIndex: process.env.NODE_ENV !== 'production', // Désactive l'auto-indexation en prod pour les performances
      })

    }),
    ThrottlerModule.forRoot([
    {
      ttl: 60_000,
      limit: 100,
    },
  ]),
  PlaceModule, RatingModule, AuthModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard, },
              {provide: APP_GUARD, useClass: JsonContentTypeGuard}],
})
export class AppModule {}
