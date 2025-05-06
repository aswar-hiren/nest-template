// src/users/users.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isUserExist = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (isUserExist) {
      throw new ConflictException('username Already Exist');
    }
    const isEmailExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (isEmailExist) {
      throw new ConflictException('email is already exist');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
}
