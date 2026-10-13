import { PartialType } from "@nestjs/swagger";
import { CreatePlaceDTO } from "../../../place/entities/dto/create-place.dto.js";
import { IsEmpty } from "class-validator";

export class UpdateRatingDTO extends PartialType(CreatePlaceDTO){
    @IsEmpty()
    placeId? : string;
}