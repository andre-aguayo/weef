import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsDateString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EventUpdateDot {
  @IsUUID()
  @ApiProperty()
  readonly eventId: string;

  @IsDateString()
  @MaxLength(50)
  @ApiProperty()
  readonly eventDate: Date;

  @IsString()
  @MaxLength(50)
  @ApiProperty()
  readonly eventName: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty()
  readonly address: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty()
  readonly city: string;
  @IsString()
  @MaxLength(50)
  @ApiProperty()
  readonly state: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty()
  readonly complement: string;

  @IsString()
  @MinLength(5)
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsUrl()
  @MinLength(5)
  @ApiProperty()
  readonly image: string;
}
