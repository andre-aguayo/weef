import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventAddDot } from './dot/event-add-dot';
import { Exception } from '../common/exception/exception';
import { User } from '../user/user.entity';
import { EventUpdateDot } from './dot/event-update-dot';
import { EventDeleteDot } from './dot/event-delete-dot ';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async list(user: User): Promise<Event[]> {
    return this.eventRepository.findBy({ userId: user.id });
  }

  async findByID(eventId: string, user: User): Promise<Event> {
    const event = this.eventRepository.findOneBy({
      id: eventId,
      userId: user.id,
    });

    if (!event) throw new Exception('messages.event.errors.find');

    return event;
  }

  async add(input: EventAddDot, user: User): Promise<Event> {
    try {
      const event = await this.eventRepository.save({
        ...input,
        user: user,
      });

      return event;
    } catch (error) {
      throw new Exception('messages.event.errors.add', error);
    }
  }

  async update(input: EventUpdateDot, user: User): Promise<Event> {
    const event = await this.findByID(input.eventId, user);
    try {
      return await this.eventRepository.save({ ...event, ...input });
    } catch (error) {
      throw new Exception('messages.event.errors.update', error);
    }
  }

  async delete(input: EventDeleteDot, user: User): Promise<Event> {
    const event = await this.findByID(input.eventId, user);
    try {
      return await this.eventRepository.softRemove(event);
    } catch (error) {
      throw new Exception('messages.event.errors.remove', error);
    }
  }
}
