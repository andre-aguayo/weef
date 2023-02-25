import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { testingModule } from '../../test.module';
import { UserService } from './user.service';
import { User } from './user.entity';
import { setDefaultEntityFields } from '../common/test/database';
import { ExceptionUnauthorized } from '../common/exception/exception-unauthorized';

describe('UserService', () => {
  let userService: UserService;
  const mockUserFindOne = jest.fn();
  const mockUserFindBy = jest.fn();
  const mockUserSave = jest.fn((user: User) => {
    return setDefaultEntityFields(user);
  });
  const mockUserRepository = {
    metadata: {
      columns: [],
      relations: [],
    },
    findOne: mockUserFindOne,
    findBy: mockUserFindBy,
    save: mockUserSave,
  };

  const secret = 'fdaslkhfdsayrekjhfdsa';

  beforeEach(async () => {
    const { module } = await testingModule({
      providers: [
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        UserService,
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
  });

  afterEach(() => jest.clearAllMocks());

  describe('user test', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
    });

    it('should login with valid user', async () => {
      const userData = {
        firstName: 'Ricardo',
        lastName: 'Saraiva',
        email: 'ricardo.saraiva@coderockr.com',
        id: 1,
        password:
          '$2b$10$uXn5EOZnFClXxs/O9IRNxOHOPbd3DJIckaqIDvvPwRNO8nq5kN/Om',
      };
      mockUserFindOne.mockReturnValueOnce(userData);

      const login = 'ricardo.saraiva@coderockr.com';
      const user = await userService.login({
        login,
        password: '12345678',
      });

      expect(mockUserFindOne).toHaveBeenCalledTimes(1);
      expect(user.token).toBeTruthy();
      expect(user.user.email).toBe(login);
      expect(user.user.password).toBeUndefined();
    });

    it('should throw exception when try login with invalid user', async () => {
      mockUserFindOne.mockReturnValueOnce({
        firstName: 'Ricardo',
        lastName: 'Saraiva',
        email: 'ricardo.saraiva@coderockr.com',
        id: 1,
        password:
          '$2b$10$uXn5EOZnFClXxs/O9IRNxOHOPbd3DJIckaqIDvvPwRNO8nq5kN/Om',
      });

      await expect(
        userService.login({
          login: 'ricardo.saraiva@coderockr.com',
          password: '78965412',
        }),
      ).rejects.toThrow(ExceptionUnauthorized);
      expect(mockUserFindOne).toHaveBeenCalledTimes(1);
    });
  });
});
