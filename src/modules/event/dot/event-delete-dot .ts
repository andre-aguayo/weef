import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EventDeleteDot {
  @IsUUID()
  @ApiProperty()
  readonly eventId: string;
}
