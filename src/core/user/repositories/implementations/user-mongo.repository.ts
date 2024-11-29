import { Injectable } from '@nestjs/common';
import { UserRepository } from '../abstractions/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserDocument,
  UserModel,
} from '../../models/schemas/user.schema';
import { UserEntity } from '../../models/entities/user.entity';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().lean();
    return users.map((user) => this.mapToUser(user as UserDocument));
  }

  private mapToUser(rawUser: UserDocument): UserEntity {
    const user = new UserEntity();

    user.id = rawUser.id;
    user.name = rawUser.name;
    user.email = rawUser.email;
    user.lastname = rawUser.lastname;
    return user;
  }
}
