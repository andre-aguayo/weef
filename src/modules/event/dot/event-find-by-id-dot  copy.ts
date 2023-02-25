import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EventFindByIdDot {
  @IsUUID()
  @ApiProperty()
  readonly eventId: string;
}
