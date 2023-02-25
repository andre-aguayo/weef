import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class AuthDot {
  @ApiProperty()
  readonly user: User;

  @ApiProperty()
  readonly token: string;
}
