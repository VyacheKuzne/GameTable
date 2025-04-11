import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // Логируем все этапы: ошибки, наличие пользователя, успешную аутентификацию.
    console.log('JWT Auth Guard сработал.');

    if (err) {
      console.log('Ошибка при аутентификации:', err);
      throw err;
    }

    if (user) {
      console.log('Пользователь успешно аутентифицирован:', user);
    } else {
      console.log('Пользователь не найден или токен невалиден.');
    }

    return user;
  }
}
