import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Rating } from './entities/rating.entity.js';
import { CreateRatingDTO } from './entities/dto/create-rating.dto.js';
import { UpdateRatingDTO } from './entities/dto/update-rating.dto.js';;
import { RatingRepository } from './rating.repository.js';

@Injectable()
export class RatingService {
    
  constructor(private readonly ratingRepository: RatingRepository) {}

  findAll(placeId?: string): Promise<Rating[]> {
    return this.ratingRepository.findAll(placeId);
  }

  async findOne(id: string): Promise<Rating> {
    const rating = await this.ratingRepository.findbyId(id);
    if (!rating) throw new NotFoundException(`The rating Id ${id} doesn't exist`);
    return rating;
  }

async create(createRatingDTO: CreateRatingDTO): Promise<Rating> {
    return this.ratingRepository.create(createRatingDTO);
}
  async update(id: string, updateRatingDTO: UpdateRatingDTO): Promise<Rating> {
    const rating = await this.ratingRepository.update(id, updateRatingDTO);
    if (!rating) throw new NotFoundException(`The rating Id ${id} doesn't exist`);
    return rating;
  }

  async remove(id: string): Promise<void> {
    const rating = await this.ratingRepository.deleteById(id);
    if (!rating) throw new NotFoundException(`The rating Id ${id} doesn't exist`);
  }
}
