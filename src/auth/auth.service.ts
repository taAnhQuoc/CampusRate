import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

export interface AuthUser {
  id: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private users = [
    { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 10) },
    { id: 2, username: 'user2', password: bcrypt.hashSync('password2', 10) },
  ];

  async validateUser(username: string, password: string): Promise<AuthUser> {
    const user = this.users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, username: user.username };
    }
    throw new UnauthorizedException('Invalid username or password');
  }

  login(user: AuthUser): { access_token: string } {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}