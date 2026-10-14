import { HydratedDocument } from "mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import { Rating } from "../entities/rating.entity.js";

export type ratingDocument = HydratedDocument<Rating>;

export const SchemaRating = SchemaFactory.createForClass(Rating);

SchemaRating.index({ placeId: 1, createdAt: -1 });
SchemaRating.pre("save", function() {
    this.updatedAt = new Date();
})