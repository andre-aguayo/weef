import { EventService } from './event.service';
import { testingModule } from '../../test.module';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Event } from './event.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { setDefaultEntityFields } from '../common/test/database';

describe('EventService', () => {
  let eventService: EventService;
  let userService: UserService;
  let userMock: User;
  const mockFindOne = jest.fn();
  const mockFindBy = jest.fn();
  const mockUserSave = jest.fn((user: User) => {
    return setDefaultEntityFields(user);
  });
  const mockUserRepository = {
    metadata: {
      columns: [],
      relations: [Event],
    },
    findOne: mockFindOne,
    findBy: mockFindBy,
    save: mockUserSave,
  };

  const mockEventSave = jest.fn((event: Event) => {
    return setDefaultEntityFields(event);
  });
  const mockEventRepository = {
    metadata: {
      columns: [],
      relations: [User],
    },
    findOne: mockFindOne,
    findBy: mockFindBy,
    save: mockEventSave,
  };

  const secret = 'fdaslkhfdsayrekjhfdsa';

  beforeEach(async () => {
    const { module } = await testingModule({
      providers: [
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        UserService,
        { provide: getRepositoryToken(Event), useValue: mockEventRepository },
        EventService,
      ],
      imports: [
        PassportModule,
        JwtModule.registerAsync({
          useFactory: () => ({
            secret,
          }),
        }),
      ],
    });
    userService = await module.resolve(UserService);
    eventService = await module.resolve(EventService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('event test', () => {
    it('should be defined', async () => {
      expect(eventService).toBeDefined();
      expect(userService).toBeDefined();
    });

    it('should create a event', async () => {
      mockFindOne.mockReturnValueOnce(null);

      const userData = {
        firstName: 'Iurru',
        lastName: 'Test',
        email: 'iurru@weef.com.br',
        id: 1,
        password:
          '$2b$10$uXn5EOZnFClXxs/O9IRNxOHOPbd3DJIckaqIDvvPwRNO8nq5kN/Om',
      };

      userMock = await userService.add(userData);
      expect(mockUserSave).toHaveBeenCalledTimes(1);

      const input = {
        eventName: 'new test',
        eventDate: new Date('now'),
        address: 'sdasdas asda',
        email: 'test@weef.com.br',
        image: 'www.google.com/dasidbasda',
        city: 'Ponta pora',
        state: 'MS',
        complement: 'complemento',
        phone: '01719071',
      };

      const event = await eventService.add(input, userMock);

      expect(mockFindOne).toHaveBeenCalledTimes(1);
      expect(mockEventSave).toHaveBeenCalledTimes(1);
      expect(event.eventName).toBe(input.eventName);
      expect(event.eventDate).toBe(input.eventDate);
      expect(event.address).toBe(input.address);
      expect(event.email).toBe(input.email);
      expect(event.image).toBe(input.image);
      expect(event.city).toBe(input.city);
      expect(event.state).toBe(input.state);
      expect(event.complement).toBe(input.complement);
      expect(event.phone).toBe(input.phone);
    });
  });
});
