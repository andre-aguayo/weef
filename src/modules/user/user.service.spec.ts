import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { testingModule } from '../../test.module';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ExceptionUnauthorized } from '../common/exception/exception-unauthorized';

describe('UserService', () => {
  let userService: UserService;
  const mockUserFindOne = jest.fn();
  const mockUserFindBy = jest.fn();
  const mockUserRepository = {
    metadata: {
      columns: [],
    },
    findOne: mockUserFindOne,
    findBy: mockUserFindBy,
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
        firstName: 'Iurru',
        lastName: 'Test',
        email: 'iurru@weef.com.br',
        id: 1,
        password:
          '$2b$10$uXn5EOZnFClXxs/O9IRNxOHOPbd3DJIckaqIDvvPwRNO8nq5kN/Om',
      };
      mockUserFindOne.mockReturnValueOnce(userData);

      const login = 'iurru@weef.com.br';
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
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@weef.com.br',
        id: 1,
        password:
          '$2b$10$uXn5EOZnFClXxs/O9IRNxOHOPbd3DJIckaqIDvvPwRNO8nq5kN/Om',
      });

      await expect(
        userService.login({
          login: 'test@weef.com.br',
          password: 'invalid',
        }),
      ).rejects.toThrow(ExceptionUnauthorized);
      expect(mockUserFindOne).toHaveBeenCalledTimes(1);
    });
  });
});
