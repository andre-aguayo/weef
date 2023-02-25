import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDot {
  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly login: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
