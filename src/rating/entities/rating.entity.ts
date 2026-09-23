import { randomUUID } from "crypto";
import { CreateRatingDTO } from "./dto/create-rating.dto.js";

export class Rating {

  id!: string;
  placeId!: string;
  authorName!: string;
  rating!: number;
  comment!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(createRatingDTO: CreateRatingDTO) {
    this.id = randomUUID();
    this.placeId = createRatingDTO.placeId;
    this.authorName = createRatingDTO.authorName;
    this.comment = createRatingDTO.comment;
    this.createdAt = new Date();
    this.updatedAt = new Date()
  }
}