import { Injectable, NotFoundException } from '@nestjs/common';
import { Place } from './entities/place.entity.js';
import { CreatePlaceDTO } from './entities/dto/create-place.dto.js';
import { UpdatePlaceDTO } from './entities/dto/update-place.dto.js';
@Injectable()
export class PlaceService {

    private readonly places: Place[] = [];

    findAll(): Place[] {
        return this.places;
    }

    findOne(id: string): Place {
        const place: Place | undefined = this.places.find((place: Place) => place.id === id )

        if(!place) {
            throw new NotFoundException(`The place Id ${id} doesn't exist`);
        }

        return place;
    }

    create(createPlaceDTO: CreatePlaceDTO) {

        const newPlace: Place = new Place(createPlaceDTO)

        Object.assign(newPlace, createPlaceDTO)

        this.places.push();

        return newPlace;
    }

    update(id: string, updatePlaceDTO: UpdatePlaceDTO): Place {
        const place: Place = this.findOne(id);

        Object.assign(place, updatePlaceDTO);
       place.updatedAt = new Date();

       return place;
    }

    remove(id: string) {
        const index: number = this.places.findIndex((place: Place) => place.id === id);

        if (index === -1) {
            throw new NotFoundException(`The place Id ${id} doesn't exist`)
        }

        this.places.splice(index,1);
    }
}
