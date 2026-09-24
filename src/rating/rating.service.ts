import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Rating } from './entities/rating.entity.js';
import { CreateRatingDTO } from './entities/dto/create-rating.dto.js';
import { UpdateRatingDTO } from './entities/dto/update-rating.dto.js';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from "fs";
import { dirname } from 'path';

@Injectable()
export class RatingService implements OnModuleInit {
    
    private ratings: Rating[] = [];
    private readonly dataPath: string;
    
    constructor(private readonly configService: ConfigService) {
         this.dataPath = this.configService.get<string>('DATA_PATH2', './data/rating.json');
    }
    //https://jsonic.io/
    async onModuleInit(): Promise<void> {
        this.ratings = await this.loadFromLocal();
    }
    // https://jsonic.io/
    private async loadFromLocal(): Promise<Rating[]> {
        try {
            const raw = await fs.readFile(this.dataPath, 'utf-8');
            return JSON.parse(raw) as Rating[];
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                return [];
            }
            throw err;
        }
    }
    //https://jsonic.io/
    private async saveToLocal(): Promise<void> {
        await fs.mkdir(dirname(this.dataPath), { recursive: true });
        await fs.writeFile(this.dataPath, JSON.stringify(this.ratings, null, 2), 'utf-8');
    }

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
    
    async create(createRatingDTO: CreateRatingDTO): Promise<Rating> {
    
        const newRating: Rating = new Rating(createRatingDTO)
    
        Object.assign(newRating, createRatingDTO)

        this.ratings.push(newRating);
    
        await this.saveToLocal();
    
        return newRating;
    }
    
    async update(id: string, updateRatingDTO: UpdateRatingDTO): Promise<Rating> {
         
        const rating: Rating = this.findOne(id);
    
        Object.assign(rating, updateRatingDTO);
        rating.updatedAt = new Date();

        await this.saveToLocal();
    
        return rating;
    }
    
    async remove(id: string): Promise<void> {
        const index: number = this.ratings.findIndex((rating: Rating) => rating.id === id);
    
        if (index === -1) {
                throw new NotFoundException(`The rating Id ${id} doesn't exist`)
        }
    
        this.ratings.splice(index,1);

        await this.saveToLocal();
    }
}
