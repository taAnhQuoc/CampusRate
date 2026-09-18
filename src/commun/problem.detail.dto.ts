import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProblemDetailsDto {

    @ApiProperty({
      description: "type of problem",
      example: "about:blank",
    })
    type!: string;
    @ApiProperty({
      description: "title of the problem",
      example: "about:blank"
    })
    title!: string;

    @ApiProperty({
      description: "status of the problem",
      example: "404",
    })
    status!: number;

    @ApiProperty({
      description: "detail of the problem",
      example: "Did not find the place with the request of id"
    })
    detail!: string;
    @ApiProperty({
      description: "Location of the problem",
      example: "/api/v1/places"
    })
    instance!: string;
    @ApiPropertyOptional({
      type: [String],
      example: ['Le nom est obligatoire.'],
    })
    errors?: string[];
    
  }