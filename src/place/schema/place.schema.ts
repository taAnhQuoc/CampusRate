import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Place } from "../entities/place.entity.js";

export type placeDocument = HydratedDocument<Place>;

export const PlaceSchema = SchemaFactory.createForClass(Place);

PlaceSchema.pre("save", function() {
    this.updatedAt = new Date();
})