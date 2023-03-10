import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserLoginDot } from './dto/user-login-dot';
import { AuthDot } from './dto/auth-dot';
import { ExceptionUnauthorized } from '../common/exception/exception-unauthorized';
import config from '../../config/config';
import { Exception } from '../common/exception/exception';
import { UserAddDot } from './dto/user-add-dot';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: UserLoginDot): Promise<AuthDot> {
    const fields = this.usersRepository.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof User)[];

    const user = await this.usersRepository.findOne({
      where: { email: input.login },
      select: fields,
    });

    if (!user) {
      throw new ExceptionUnauthorized('messages.common.errors.unauthorized');
    }

    const isValidPassword = await compare(input.password, user.password);

    if (!isValidPassword) {
      throw new ExceptionUnauthorized('messages.common.errors.unauthorized');
    }

    const payloadJwt = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payloadJwt, {
      expiresIn: config.jwt.expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }

  async add(input: UserAddDot): Promise<User> {
    const isRegistered = await this.usersRepository.findOne({
      where: { email: input.email },
    });

    if (isRegistered) {
      throw new Exception('messages.user.errors.isRegistered');
    }

    try {
      const user = await this.usersRepository.save({
        ...input,
        password: await hash(input.password, 10),
      });

      delete user.password;
      return user;
    } catch (error) {
      throw new Exception('messages.user.errors.add', error);
    }
  }

  async findByID(userID: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: userID },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email: email },
    });
  }
}
