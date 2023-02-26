import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAddDot {
  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  readonly password: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly lastName: string;
}
