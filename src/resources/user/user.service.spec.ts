import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

type MockType<T> = {
  [P in keyof T]: jest.Mock<any>;
};

const repositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('User Service', () => {
  let service: UserService;
  let repositoryMock: MockType<Repository<UserEntity>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const user = { name: 'John', avatar: undefined, email: 'hello@example.com' };
      repositoryMock.findOne.mockReturnValue(user);
      const res = await service.findByEmail(user.email);
      expect(res).toEqual({ user });

      // And make assertions on how often and with what params your mock's methods are called
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ email: user.email });
    });
  });
});
