import { PlaceService } from './place.service.js';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CreatePlaceDTO } from './entities/dto/create-place.dto.js';
import { UpdatePlaceDTO } from './entities/dto/update-place.dto.js';
import { ProblemDetailsDto } from '../commun/problem.detail.dto.js';
import { PageDetailsDto } from '../commun/page.details.dto.js';
import { ApiCreatedResponse, ApiOperation, ApiBadRequestResponse, ApiParam, ApiOkResponse, ApiUnsupportedMediaTypeResponse, ApiConflictResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard.js';

@Controller('places')
export class PlaceController {

    constructor(
        private readonly placeService: PlaceService
    ) {}

    @Post()
    @ApiOperation({
      summary: "Create a place",
      description: "Add room to current database"
    })
    @ApiCreatedResponse({
      description: "This place has been created",
    })
    @ApiBadRequestResponse({
      description: 'Invalid Data.',
      type: ProblemDetailsDto,
    })
    @ApiConflictResponse({ 
      description: 'Name already used', 
      type: ProblemDetailsDto 
    })
    @ApiUnsupportedMediaTypeResponse({ 
      description: 'Content-Type must be application/json' 
    })
    create(@Body() createPlaceDTO: CreatePlaceDTO) {
      return this.placeService.create(createPlaceDTO);
    }
    @Get()
    @ApiOperation({
      summary: "A list of all places",
      description: "Returns all places from the database"
    })
    @ApiBadRequestResponse({
      description: 'Invalid Data.',
      type: ProblemDetailsDto,
    })
    @ApiOkResponse({
      description: 'List of places in page format',
      type: PageDetailsDto,
    })
    findAll() {
      return this.placeService.findAll();
    }

    @Get(':id')
    @ApiParam({
      name: 'id',
      description: 'Identifiant UUID du place',
      example: "plc_58bcf690-43e9-4739-a230-185a696fe9f"
    })
    @ApiOperation({
      summary: 'Find place by id',
      description: "Finds a place by it's id and show it",
    })
    @ApiBadRequestResponse({
      description: 'Invalid Data.',
      type: ProblemDetailsDto,
    })
    findOne(@Param('id') id: string) {
      return this.placeService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({
      summary: "Update a place",
      description: "Update room in current database"
    })
    @ApiCreatedResponse({
      description: "This place has been updated",
    })
    @ApiParam({
      name: 'id',
      description: 'Uuid of the place',
      example: "plc_58bcf690-43e9-4739-a230-185a696fe9f"
    })
    @ApiBadRequestResponse({
      description: 'Invalid Data.',
      type: ProblemDetailsDto,
    })
    @ApiUnsupportedMediaTypeResponse({ 
      description: 'Content-Type must be application/json' 
    })
    @ApiConflictResponse({ 
      description: 'Name already used', 
      type: ProblemDetailsDto 
    })
    update(@Param('id') id: string, @Body() updatePlaceDTO: UpdatePlaceDTO) {
      return this.placeService.update(id, updatePlaceDTO);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Delete a place',
        description: 'Delete a place in the database.',
      })
    @ApiBadRequestResponse({
      description: 'Invalid Data.',
      type: ProblemDetailsDto,
    })   
    @ApiParam({
      name: 'id',
      description: 'Uuid of the place',
      example: "plc_58bcf690-43e9-4739-a230-185a696fe9f"
    })
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
      return this.placeService.remove(id);
    }

}
