import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt/jwt-auth.guard.js';
import { ProblemDetailsDto } from '../commun/problem.detail.dto.js';
import { LoginDTO } from './dto/login.dto.js';
import { TokenDto } from './dto/token.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ 
    default: { limit: 5, ttl: 60_000 }
  })
  @ApiOperation({ 
    summary: 'Log in', 
    description: 'Returns a JWT valid for a limited time' 
  })
  @ApiOkResponse({
    description: 'Authenticated', 
    type: TokenDto 
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid Data.', 
    type: ProblemDetailsDto 
  })
  @ApiUnauthorizedResponse({ 
    description: 'Wrong username or password', 
    type: ProblemDetailsDto 
  })
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.authService.validateUser(loginDTO.username, loginDTO.password);
    return this.authService.login(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Current user', 
    description: 'Needs a valid Bearer token' 
  })
  @ApiOkResponse({ 
    description: 'The user identified by the token' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'Missing, invalid or expired token', 
    type: ProblemDetailsDto 
  })
  getProfile(@Req() req: { user: { userId: number; username: string } }) {
    return req.user;
  }
}