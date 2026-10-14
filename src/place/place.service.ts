import { Injectable, NotFoundException } from '@nestjs/common';
import { Place } from './entities/place.entity.js';
import { CreatePlaceDTO } from './entities/dto/create-place.dto.js';
import { UpdatePlaceDTO } from './entities/dto/update-place.dto.js';
import { ConflictException } from '@nestjs/common';
import { PlaceRepository } from './place.repository.js';
import { isDuplicateKeyError } from '../commun/mongo-error.js';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  findAll(): Promise<Place[]> {
    return this.placeRepository.findAll();
  }

  async findOne(id: string): Promise<Place> {
    const place = await this.placeRepository.findbyId(id);
    if (!place) throw new NotFoundException(`The place Id ${id} doesn't exist`);
    return place;
  }

async create(createPlaceDTO: CreatePlaceDTO): Promise<Place> {

  const existing = await this.placeRepository.findByName(createPlaceDTO.name);
  if (existing) {
    throw new ConflictException(`A place named "${createPlaceDTO.name}" already exists`);
  }
  try {
    return await this.placeRepository.create(createPlaceDTO);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
        throw new ConflictException(`A place named "${createPlaceDTO.name}" already exists`);
    } 
        throw error;
  }
  
}
  async update(id: string, updatePlaceDTO: UpdatePlaceDTO): Promise<Place> {
    try {
    const place = await this.placeRepository.update(id, updatePlaceDTO);
    if (!place) throw new NotFoundException(`The place Id ${id} doesn't exist`);
    return place;
    } catch (error) {
        if (isDuplicateKeyError(error)) {
            throw new ConflictException(`A place named "${updatePlaceDTO.name}" already exists`)
        } 
        throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const place = await this.placeRepository.deleteById(id);
    if (!place) throw new NotFoundException(`The place Id ${id} doesn't exist`);
  }
}