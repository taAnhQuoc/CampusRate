import { Module } from '@nestjs/common';
import { PlaceModule } from './place/place.module.js';
import { RatingModule } from './rating/rating.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    PlaceModule, RatingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
