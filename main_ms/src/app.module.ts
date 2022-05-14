import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { configValidationSchema } from './config.schema';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';

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

    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    MessagesModule,
    ConversationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
