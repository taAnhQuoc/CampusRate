import { PartialType } from "@nestjs/swagger";
import { CreatePlaceDTO } from "./create-place.dto.js";

export class UpdatePlaceDTO extends PartialType(CreatePlaceDTO) {

}