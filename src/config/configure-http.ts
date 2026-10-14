import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

const ALLOWED_METHODS = ['GET', 'POST', 'PATCH', 'DELETE'];
const BODY_LIMIT = '10kb';                                     

export function configureHttp(app: NestExpressApplication): void {
  app.use(helmet());

  app.enableCors({
    origin: ['http://localhost:3030'],
    methods: ALLOWED_METHODS,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'HEAD' || req.method === 'OPTIONS' || ALLOWED_METHODS.includes(req.method)) {
      return next();
    }
    res.setHeader('Allow', ALLOWED_METHODS.join(', '));
    res.status(405).json({
      type: 'about:blank', title: 'Method Not Allowed', status: 405,
      detail: `Method ${req.method} is not allowed. Allowed: ${ALLOWED_METHODS.join(', ')}`,
      instance: req.url,
    });
  });

  app.useBodyParser('json', { limit: BODY_LIMIT });
}