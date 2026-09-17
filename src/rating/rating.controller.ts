import { Body, Controller, Post, Get, Param, Patch, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { RatingService } from './rating.service.js';
import { CreateRatingDTO } from './entities/dto/create-rating.dto.js';
import { UpdatePlaceDTO } from '../place/entities/dto/update-place.dto.js';

@Controller('rating')
export class RatingController {

    constructor(
       private readonly ratingService : RatingService 
    ) {}

    @Post()
    create(@Body() createRatingDTO: CreateRatingDTO) {
        return this.ratingService.create(createRatingDTO)
    }

    @Get()
    findAll() {
        return this.ratingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ratingService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRatingDTO: UpdatePlaceDTO) {
        return this.ratingService.update(id, updateRatingDTO)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.ratingService.remove(id)
    }
}
