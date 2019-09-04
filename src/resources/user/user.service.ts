import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(loginUserDto: LoginUserDto): Promise<UserEntity | undefined> {
    const findOneOptions = {
      email: loginUserDto.email,
      password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
    };

    return await this.userRepository.findOne(findOneOptions);
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { name, email, avatar } = dto;
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.name = :username', { name })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
    }

    // create new user
    const newUser = new UserEntity();
    newUser.name = name;
    newUser.email = email;
    newUser.avatar = avatar;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return buildUserRO(savedUser);
    }
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ email: email });
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return buildUserRO(user);
  }

  async findByEmail(email: string): Promise<UserRO | undefined> {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      return undefined;
    }

    return buildUserRO(user);
  }
}

function buildUserRO(user: UserEntity): UserRO {
  const userRO = {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };

  return { user: userRO };
}
