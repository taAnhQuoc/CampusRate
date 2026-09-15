import { CreatePlaceDTO } from "./dto/create-place.dto.js";
import { randomUUID } from "crypto";

export class Place {

  id!: string;
  name!: string;
  description!: string;
  category!: string;
  address!: string;
  services?: string[] = [];
  status?: string = 'active';
  averageRating: number = NaN;
  reviewCount: number = 0;
  createdAt: Date;
  updatedAt: Date;

  constructor(createPlaceDTO: CreatePlaceDTO ) {

    this.id = 'plc_' + randomUUID();
    this.name = createPlaceDTO.name;
    this.description = createPlaceDTO.description;
    this.category = createPlaceDTO.category;
    this.address = createPlaceDTO.address;
    this.services = createPlaceDTO.services;
    this.status = createPlaceDTO.status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    
  }
}