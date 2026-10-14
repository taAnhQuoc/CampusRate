import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller.js';
import { RatingService } from './rating.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating } from './entities/rating.entity.js';
import { SchemaRating } from './schema/rating.schema.js';
import { RatingRepository } from './rating.repository.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: SchemaRating }]),
  AuthModule],
  controllers: [RatingController],
  providers: [RatingService, RatingRepository]
})
export class RatingModule {}
