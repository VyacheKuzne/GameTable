import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies?.['access_token'];
          console.log('[JWT Strategy] Извлечён токен из cookie:', token);
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'supersecretkey123',
    });

    console.log('[JWT Strategy] Стратегия JWT инициализирована');
  }

  async validate(payload: any) {
    console.log('[JWT Strategy] Токен прошёл проверку. Payload:', payload);
    return { id: payload.id, status: payload.status };
  }
}
