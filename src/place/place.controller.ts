import { PlaceService } from './place.service.js';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreatePlaceDTO } from './entities/dto/create-place.dto.js';
import { UpdatePlaceDTO } from './entities/dto/update-place.dto.js';
@Controller('places')
export class PlaceController {

    constructor(
        private readonly placeService: PlaceService
    ) {}

    @Post()
    create(@Body() createPlaceDTO: CreatePlaceDTO) {
      return this.placeService.create(createPlaceDTO);
    }
  
    @Get()
    findAll() {
      return this.placeService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.placeService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlaceDTO: UpdatePlaceDTO) {
      return this.placeService.update(id, updatePlaceDTO);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
      return this.placeService.remove(id);
    }


}
