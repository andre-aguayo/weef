import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user.service';
import { ExceptionUnauthorized } from '../../common/exception/exception-unauthorized';
import config from '../../../config/config';
import { User } from '../user.entity';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    const user = this.userService.findByID(payload.id);
    if (!user) {
      throw new ExceptionUnauthorized('messages.common.errors.unauthorized');
    }
    return user;
  }
}

export { JwtStrategy };
