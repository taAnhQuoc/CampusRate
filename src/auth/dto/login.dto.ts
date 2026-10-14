import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ 
    description: 'Username', 
    example: 'user1', 
    maxLength: 50 })
  @IsString() 
  @IsNotEmpty() 
  @MaxLength(50)
  username!: string;

  @ApiProperty({ 
    description: 'Password', 
    example: 'password1', 
    maxLength: 100 
  })
  @IsString() 
  @IsNotEmpty() 
  @MaxLength(100)
  password!: string;
}