import { CanActivate, ExecutionContext, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JsonContentTypeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    if (!['POST', 'PUT', 'PATCH'].includes(req.method)) return true;

    if (req.headers['content-length'] === '0') return true;

    if (req.is('application/json') === false) {
      throw new UnsupportedMediaTypeException('Content-Type must be application/json');
    }
    return true;
  }
}