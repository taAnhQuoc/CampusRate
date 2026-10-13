import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller.js';
import { PlaceService } from './place.service.js';
import { PlaceSchema } from './schema/place.schema.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Place } from './entities/place.entity.js';
import { PlaceRepository } from './place.repository.js';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository]
})
export class PlaceModule {}
