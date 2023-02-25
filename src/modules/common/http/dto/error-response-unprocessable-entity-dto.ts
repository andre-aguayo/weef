import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorResponseDto } from './base-error-response-dto';

class UnprocessableEntityError {
  @ApiProperty()
  field: string;

  @ApiProperty()
  error: string[];
}

export class ErrorResponseUnprocessableEntityDto extends BaseErrorResponseDto {
  @ApiProperty({ type: [UnprocessableEntityError] })
  readonly message: UnprocessableEntityError[];
}
