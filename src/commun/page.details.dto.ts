import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export class PageDetailsDto<Type> {
  @ApiProperty({
    description: 'The data of the page',
  })
  @IsNotEmpty()
  data!: Type[];
  @ApiProperty({
    description: 'Pagination info',
    example: {
      page: 1,
      limit: 10,
      totalItem: 100,
      toalPages: 10,
    },
  })
  @IsNotEmpty()
  pagination!: Pagination;
}