import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Place } from "./entities/place.entity.js";
import { CreatePlaceDTO } from "./entities/dto/create-place.dto.js";
import { UpdatePlaceDTO } from "./entities/dto/update-place.dto.js";

@Injectable()
export class PlaceRepository {
    constructor(
        @InjectModel(Place.name) private readonly placeModel: Model<Place>,
    ) {}
    async findByName(name: string) {
        return this.placeModel.findOne({ name }).exec();
    }
    async findAll(): Promise<Place[]> {
        return this.placeModel.find().exec();
    }
    
    async create(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
        const newPlace = new this.placeModel(createPlaceDTO)
        return newPlace.save();
    }

    async findbyId(id: string){
        return this.placeModel.findOne({ id }).exec()
    }

    async update(id: string, updatePlaceDTO: UpdatePlaceDTO) {
        return this.placeModel.findOneAndUpdate({ id }, { $set: updatePlaceDTO }, { returnDocument: "after"}).exec();
    }

    async deleteById(id: string) {
        return this.placeModel.findOneAndDelete({ id }).exec();
    }
}