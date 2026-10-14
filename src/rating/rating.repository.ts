import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rating } from "./entities/rating.entity.js";
import { CreateRatingDTO } from "./entities/dto/create-rating.dto.js";
import { UpdateRatingDTO } from "./entities/dto/update-rating.dto.js";

export interface RatingSummary {
  placeId: string;
  averageRating: number | null;
  ratingCount: number;
}
@Injectable()
export class RatingRepository {
    constructor(
        @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
    ) {}
    async findAll(placeId?: string) {
        const filter = placeId ? { placeId } : {};
        return this.ratingModel.find(filter).sort({ createdAt: -1 }).exec();
    }
    
    async create(createPlaceDTO: CreateRatingDTO): Promise<Rating> {
        const newPlace = new this.ratingModel(createPlaceDTO)
        return newPlace.save();
    }

    async findbyId(id: string){
        return this.ratingModel.findOne({ id }).exec()
    }

    async update(id: string, updateRatingDTO: UpdateRatingDTO) {
        return this.ratingModel.findOneAndUpdate({ id }, { $set: updateRatingDTO }, { returnDocument: "after"}).exec();
    }

    async deleteById(id: string) {
        return this.ratingModel.findOneAndDelete({ id }).exec();
    }

    async summaryForPlace(placeId: string): Promise<RatingSummary> {
    const [row] = await this.ratingModel
        .aggregate<{ average: number; count: number }>([
        { $match: { placeId } },
        { $group: { _id: '$placeId', average: { $avg: '$rating' }, count: { $sum: 1 } } },
        ])
        .exec();

    return {
        placeId,
        averageRating: row ? Math.round(row.average * 100) / 100 : null,
        ratingCount: row ? row.count : 0,
    };
    }
}