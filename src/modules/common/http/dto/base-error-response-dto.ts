import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseErrorResponseDto {
  @ApiProperty({ required: false, description: 'avaliable in dev mode' })
  readonly stackTracer?: string[] | null;

  @ApiProperty({ required: false, description: 'avaliable in dev mode' })
  readonly context?: any | null;
}
