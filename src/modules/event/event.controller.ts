import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import routes from '../../config/routes';
import { Role } from '../common/enums/role.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '../common/http/dto/error-response-dto';
import { ErrorResponseUnprocessableEntityDto } from '../common/http/dto/error-response-unprocessable-entity-dto';
import { CurrentUser } from '../user/decorators/user.decorator';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { EventAddDot } from './dot/event-add-dot';
import { EventDeleteDot } from './dot/event-delete-dot ';
import { EventUpdateDot } from './dot/event-update-dot';
import { EventFindByIdDot } from './dot/event-find-by-id-dot  copy';

@Controller(routes.event.alias)
@ApiTags('event')
@UseInterceptors(ClassSerializerInterceptor)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get(routes.event.list)
  @Roles(Role.PRIVATE)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: Event })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    type: ErrorResponseUnprocessableEntityDto,
  })
  async userEvents(@CurrentUser() user): Promise<Event[]> {
    return this.eventService.list(user.user);
  }

  @Get(routes.event.find)
  @Roles(Role.PRIVATE)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: Event })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    type: ErrorResponseUnprocessableEntityDto,
  })
  async findById(
    @Body() input: EventFindByIdDot,
    @CurrentUser() user,
  ): Promise<Event> {
    return this.eventService.findByID(input.eventId, user.user);
  }

  @Post(routes.event.add)
  @Roles(Role.PRIVATE)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: Event })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    type: ErrorResponseUnprocessableEntityDto,
  })
  async add(@Body() input: EventAddDot, @CurrentUser() user): Promise<Event> {
    return this.eventService.add(input, user.user);
  }

  @Put(routes.event.update)
  @Roles(Role.PRIVATE)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: Event })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    type: ErrorResponseUnprocessableEntityDto,
  })
  async update(
    @Body() input: EventUpdateDot,
    @CurrentUser() user,
  ): Promise<Event> {
    return this.eventService.update(input, user.user);
  }

  @Delete(routes.event.delete)
  @Roles(Role.PRIVATE)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: Event })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    type: ErrorResponseUnprocessableEntityDto,
  })
  async delete(
    @Body() input: EventDeleteDot,
    @CurrentUser() user,
  ): Promise<Event> {
    return this.eventService.delete(input, user.user);
  }
}
