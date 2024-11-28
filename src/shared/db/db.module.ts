import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentVariablesType } from '../config/models/types/env-vars.type';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariablesType>,
      ) => {
        const uri = configService.get<string>('MONGODB_URI');
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
