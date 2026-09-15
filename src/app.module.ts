import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PlaceModule } from './place/place.module.js';
import { ReviewModule } from './review/review.module.js';
import { RatingModule } from './rating/rating.module.js';

@Module({
  imports: [PlaceModule, ReviewModule, RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
