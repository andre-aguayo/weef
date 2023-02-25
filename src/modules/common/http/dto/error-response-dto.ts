import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorResponseDto } from './base-error-response-dto';

export class ErrorResponseDto extends BaseErrorResponseDto {
  @ApiProperty()
  readonly message: string;
}
