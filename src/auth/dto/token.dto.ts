import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
@ApiProperty({ 
    description: 'JWT to send as "Authorization: Bearer <token>"' 
})
  access_token!: string;
}