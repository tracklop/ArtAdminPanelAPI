import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.userModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateData: any = { ...updateUserDto };
    if (updateUserDto.password) {
      updateData.password = await this.hashPassword(updateUserDto.password);
    }
    await this.userModel.update(updateData, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds =
      parseInt(this.configService.get<string>('SALT_ROUNDS'), 10) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async createDefaultUser(): Promise<void> {
    const users = await this.findAll();
    if (users.length === 0) {
      await this.create({
        email: 'johndoe@gmail.com',
        password: 'johndoe123',
        lastname: 'Doe',
        firstname: 'John',
      });
      console.log('Default admin user created.');
    }
  }
}
