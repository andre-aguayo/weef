import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthDot } from './dto/auth-dot';
import routes from '../../config/routes';
import { UserService } from './user.service';
import { Role } from '../common/enums/role.enum';
import { UserLoginDot } from './dto/user-login-dot';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '../common/http/dto/error-response-dto';
import { ErrorResponseUnprocessableEntityDto } from '../common/http/dto/error-response-unprocessable-entity-dto';
import { User } from './user.entity';
import { CurrentUser } from './decorators/user.decorator';

@Controller(routes.user.alias)
@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @Roles(Role.PUBLIC)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: AuthDot })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    type: ErrorResponseUnprocessableEntityDto,
  })
  async login(@Body() input: UserLoginDot): Promise<AuthDot> {
    return this.userService.login(input);
  }

  @Get(routes.user.authTest)
  @Roles(Role.PRIVATE)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    type: ErrorResponseUnprocessableEntityDto,
  })
  async profile(@CurrentUser() user): Promise<User> {
    return this.userService.findByID(user.user.id);
  }
}
