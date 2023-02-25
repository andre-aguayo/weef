import { Event } from './event.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from '../../config/config';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Event]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: config.jwt.secret,
      }),
    }),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
