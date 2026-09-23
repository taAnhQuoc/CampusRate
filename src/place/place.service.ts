import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Place } from './entities/place.entity.js';
import { CreatePlaceDTO } from './entities/dto/create-place.dto.js';
import { UpdatePlaceDTO } from './entities/dto/update-place.dto.js';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import { dirname } from 'path';

@Injectable()
export class PlaceService implements OnModuleInit {

    private places: Place[] = [];
    private readonly dataPath: string;

    constructor(private readonly configService: ConfigService) {
        this.dataPath = this.configService.get<string>('DATA_PATH', './data/places.json');
    }

    async onModuleInit(): Promise<void> {
        this.places = await this.loadFromLocal();
    }

    private async loadFromLocal(): Promise<Place[]> {
        try {
            const raw = await fs.readFile(this.dataPath, 'utf-8');
            return JSON.parse(raw) as Place[];
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                return [];
            }
            throw err;
        }
    }

    private async saveToLocal(): Promise<void> {
        await fs.mkdir(dirname(this.dataPath), { recursive: true });
        await fs.writeFile(this.dataPath, JSON.stringify(this.places, null, 2), 'utf-8');
    }

    findAll(): Place[] {
        return this.places;
    }

    findOne(id: string): Place {
        const place = this.places.find((place: Place) => place.id === id);

        if (!place) {
            throw new NotFoundException(`The place Id ${id} doesn't exist`);
        }

        return place;
    }

    async create(createPlaceDTO: CreatePlaceDTO): Promise<Place> {
        const newPlace: Place = new Place(createPlaceDTO);
        Object.assign(newPlace, createPlaceDTO);

        this.places.push(newPlace);

        await this.saveToLocal();

        return newPlace;
    }

    async update(id: string, updatePlaceDTO: UpdatePlaceDTO): Promise<Place> {
        const place: Place = this.findOne(id);

        Object.assign(place, updatePlaceDTO);
        place.updatedAt = new Date();

        await this.saveToLocal();

        return place;
    }

    async remove(id: string): Promise<void> {
        const index = this.places.findIndex((place: Place) => place.id === id);

        if (index === -1) {
            throw new NotFoundException(`The place Id ${id} doesn't exist`);
        }

        this.places.splice(index, 1);

        await this.saveToLocal();
    }
}