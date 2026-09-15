import { Module } from '@nestjs/common';
import { PlaceModule } from './place/place.module.js';
import { RatingModule } from './rating/rating.module.js';

@Module({
  imports: [PlaceModule, RatingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
