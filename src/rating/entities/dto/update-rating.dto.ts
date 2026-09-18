import { PartialType } from "@nestjs/swagger";
import { CreatePlaceDTO } from "../../../place/entities/dto/create-place.dto.js";

export class UpdateRatingDTO extends PartialType(CreatePlaceDTO){
    
}