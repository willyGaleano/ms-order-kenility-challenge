import { UserEntity } from '../../models/entities/user.entity';

export const USER_REPOSITORY = 'UserRepository';

export interface UserRepository {
  findAll(): Promise<UserEntity[]>;
}
