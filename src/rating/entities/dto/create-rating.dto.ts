import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
  Max,
  Min,
  IsNumber
} from "class-validator";

export class CreateRatingDTO {

    // Rating Id
    @ApiProperty({
        description: "Rating Id of this place",
        example: "plc_w12593068036",
        maxLength: 100
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100, {message: "Id cannot be longer then 100 characters"})
    placeId!: string

    // Author name
    @ApiProperty({
        description: "Name of author",
        example: "Sosuke Aizen",
        maxLength: 100
    })
    @IsString()
    @IsNotEmpty({message: "Author name is required"})
    @MaxLength(100, {message: "Author name cannot be more then 100 characters"})
    authorName!: string;

    // Rating
    @ApiProperty({
        description: 'Rating of this place',
        example: 3,
        minimum: 0,
        maximum: 5,
    })
    @IsInt()
    @IsNumber()
    @Min(0, { message: 'Rating cannot be minus, Min 0' })
    @Max(5, { message: 'Rating cannot be above 5, Max 5' })
    @IsNotEmpty()
    rating!: number;

    // Comment
    @ApiProperty({
        description: "Comment of this place",
        example: "Wow this place is cool!",
        maxLength: 200
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200, {message: "Comments cannot exceed 200 characters"})
    comment!: string;

}