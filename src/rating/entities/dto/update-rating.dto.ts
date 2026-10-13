import { PartialType, OmitType } from "@nestjs/swagger";
import { CreateRatingDTO } from "./create-rating.dto.js";

export class UpdateRatingDTO extends PartialType(
  OmitType(CreateRatingDTO, ['placeId'] as const),
) {}