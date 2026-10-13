import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreatePlaceDTO {

    // Name
    @ApiProperty({
        description: "Name of place",
        example: "Main Hall",
        maxLength: 30
    })
    @IsString()
    @IsNotEmpty({message: "Name cannot be empty"})
    @MaxLength(50)
    name!: string;

    // Description
    @ApiProperty({
        description: "Description of place",
        example: "A small but cozy area",
        maxLength: 120
    })
    @IsNotEmpty({message: "description cannot be empty"})
    @MaxLength(120, ({message: "Cannot be more then 120 characters"}))
    description!: string;

    // Category
    @ApiProperty({
        description: "A category of places",
        example: [      
      "STUDY_SPACE",
      "LIBRARY",
      "FOOD_SERVICE",
      "SPORTS",
      "STUDENT_SERVICE",
      "COMPUTER_LAB",
      "OTHER",]
    })
    @IsIn([      
      "STUDY_SPACE",
      "LIBRARY",
      "FOOD_SERVICE",
      "SPORTS",
      "STUDENT_SERVICE",
      "COMPUTER_LAB",
      "OTHER",])
    @IsNotEmpty()
    @IsString()
    @MaxLength(100, ({message: "Category cannot be too long, Max: 100 characters"}))  
    category!: string;

    // Address
    @ApiProperty({
        description: "The number of address associated to this place",
        example: "Sport Hall, 000B, Local 201",
        maxLength: 30
    })
    @IsString()
    @MaxLength(100, { message: "Address is too long, Max: 100 characters" })
    @IsNotEmpty()
    address!: string

    // Service
    @IsOptional()
    @ApiProperty({
        description: "Services offers at this place",
        example: ["WIFI", "NO_WIFI"],
        maxLength: 120
    })
    @IsArray()
    @MaxLength(50, {
        each: true,
        message: "One element is too long, Max 50 characters per element"
    })
    services?: string[];

    // Status
    @ApiProperty({
        description: "Status of this place",
        example: ["active","temporarily_active","closed","inactive"],
        maxLength: 30
    })
    @IsString()
    @IsOptional()
    @MaxLength(30, {message: "Cannot be more then 30 characters"})
    status?: string;
}