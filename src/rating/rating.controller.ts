import { Body, Controller, Post, Get, Param, Patch, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { RatingService } from './rating.service.js';
import { CreateRatingDTO } from './entities/dto/create-rating.dto.js';
import { UpdatePlaceDTO } from '../place/entities/dto/update-place.dto.js';
import { ProblemDetailsDto } from '../commun/problem.detail.dto.js';
import { ApiCreatedResponse, ApiOperation, ApiBadRequestResponse, ApiParam, ApiOkResponse } from '@nestjs/swagger';

@Controller('ratings')
export class RatingController {

    constructor(
       private readonly ratingService : RatingService 
    ) {}

    @ApiOperation({
      summary: "Create a rating",
      description: "Add rating to current database"
    })
    @ApiCreatedResponse({
      description: "This rating has been created",
    })
    @ApiBadRequestResponse({
      description: 'Invalid Data.',
      type: ProblemDetailsDto,
    })
    @Post()
    create(@Body() createRatingDTO: CreateRatingDTO) {
        return this.ratingService.create(createRatingDTO)
    }

    @Get()
    @ApiOperation({
        summary: 'Lists ratings of a place',
        description: 'lists ratings related to a placeId',
    })
    @ApiBadRequestResponse({
      description: 'Invalid Data.',
      type: ProblemDetailsDto,
    })
    findAll() {
        return this.ratingService.findAll();
    }

    @Get(':id')
    @ApiParam({
      name: 'id',
      description: 'Identifiant UUID du rating',
      format: 'uuid',
    })
    @ApiOperation({
      summary: 'Find rating by id',
      description: "Finds a rating by it's id and show it",
    })
    @ApiBadRequestResponse({
      description: 'Invalid Data.',
      type: ProblemDetailsDto,
    })
    findOne(@Param('id') id: string) {
        return this.ratingService.findOne(id)
    }

    @Patch(':id')
    @ApiOperation({
      summary: 'Updates the rating',
      description: "Updates the rating with it's id ",
    })
    @ApiOkResponse({
      description: 'Returns the updated rating',
    })
    @ApiParam({
      name: 'id',
      description: 'uuid of the rating to update',
      format: 'uuid',
    })
    update(@Param('id') id: string, @Body() updateRatingDTO: UpdatePlaceDTO) {
        return this.ratingService.update(id, updateRatingDTO)
    }
   @ApiOperation({
        summary: 'Delete a rating',
        description: 'Delete a rating in the database.',
      })
    @ApiBadRequestResponse({
      description: 'Invalid Data.',
      type: ProblemDetailsDto,
    })   
    @ApiParam({
      name: 'id',
      description: 'Uuid of the rating',
      format: 'uuid',
    })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.ratingService.remove(id)
    }
}
