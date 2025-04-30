import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['access_token'];
          }
          return token;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: 'supersecretkey123',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
