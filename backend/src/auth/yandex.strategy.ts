import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor() {
    super({
      clientID: '48a5fec8f1ee4b3888ba3721222c255a',
      clientSecret: '48d4d82213954f41b1d8387513505258',
      callbackURL: 'http://localhost:3000/auth/yandex/callback', 
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return profile; // это будет в req.user
  }
}
