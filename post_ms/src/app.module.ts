import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { configValidationSchema } from './config.schema';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('MONGO_URL'),
          database: configService.get('MONGO_DATABASE'),
          useNewUrlParser: true,
          synchronize: true,
          ssl: true,
          authSource: 'admin',
          logging: true,
          useUnifiedTopology: true,
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          autoLoadEntities: true,
        };
      },
    }),

    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
