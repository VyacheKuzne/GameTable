// src/auth/strategies/yandex.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import axios from 'axios';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor() {
    super({
      authorizationURL: 'https://oauth.yandex.ru/authorize',
      tokenURL: 'https://oauth.yandex.ru/token',
      clientID: '48a5fec8f1ee4b3888ba3721222c255a',
      clientSecret: '48d4d82213954f41b1d8387513505258',
      callbackURL: 'http://localhost:3000/auth/yandex/callback',
    });
  }

  async validate(accessToken: string) {
    const { data } = await axios.get('https://login.yandex.ru/info', {
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });

    return {
      yandexId: data.id,
      email: data.default_email,
      name: data.real_name,
    };
  }
}
