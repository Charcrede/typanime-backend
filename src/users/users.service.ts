import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AppDataSource } from 'src/database/data-source';

@Injectable()
export class UsersService {
  private readonly userRepo = AppDataSource.getRepository(User);
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOrCreateOAuthUser(oauthUser: {
    provider: 'google' | 'github';
    providerId: string;
    email?: string;
    name?: string;
    avatar?: string;
  }) {
    let user = await this.userRepo.findOne({
      where: {
        provider: oauthUser.provider,
        provider_id: oauthUser.providerId,
      },
    });

    if (!user) {
      user = this.userRepo.create({
        provider: oauthUser.provider,
        provider_id: oauthUser.providerId,
        email: oauthUser.email,
        username: oauthUser.name,
        avatar: oauthUser.avatar,
      });

      await this.userRepo.save(user);
    }

    return user;
  };

}
