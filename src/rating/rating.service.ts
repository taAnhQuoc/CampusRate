import { Injectable } from '@nestjs/common';
import { Rating } from './entities/rating.entity.js';
import { NotFoundException } from '@nestjs/common';
import { CreateRatingDTO } from './entities/dto/create-rating.dto.js';
import { UpdateRatingDTO } from './entities/dto/update-rating.dto.js';
@Injectable()
export class RatingService {
    
    private readonly ratings: Rating[] = [];
    
    findAll(): Rating[] {
        return this.ratings;
    }
    
    findOne(id: string): Rating {
        const rating: Rating | undefined = this.ratings.find((rating: Rating) => rating.id === id )
        
        if(!rating) {
                    throw new NotFoundException(`The rating Id ${id} doesn't exist`);
        }
        
        return rating;
    }
    
    create(createRatingDTO: CreateRatingDTO) {
    
        const newRating: Rating = new Rating(createRatingDTO)
    
           Object.assign(newRating, createRatingDTO)
    
        this.ratings.push();
    
        return newRating;
    }
    
    update(id: string, updateRatingDTO: UpdateRatingDTO): Rating {
         
        const rating: Rating = this.findOne(id);
    
        Object.assign(rating, updateRatingDTO);
        rating.updatedAt = new Date();
    
        return rating;
    }
    
    remove(id: string) {
        const index: number = this.ratings.findIndex((rating: Rating) => rating.id === id);
    
        if (index === -1) {
                throw new NotFoundException(`The rating Id ${id} doesn't exist`)
        }
    
        this.ratings.splice(index,1);
    }
}
