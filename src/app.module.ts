import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ContentsModule } from './contents/contents.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { StatsModule } from './stats/stats.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ChallengeParticipantsModule } from './challenge-participants/challenge-participants.module';
import { Category } from './categories/entities/category.entity';
import { Content } from './contents/entities/content.entity';
import { Challenge } from './challenges/entities/challenge.entity';
import { ChallengeParticipant } from './challenge-participants/entities/challenge-participant.entity';
import { User } from './users/entities/user.entity';
import { Game } from './games/entities/game.entity';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // DEV ONLY
    }),
    TypeOrmModule.forFeature([
      Category,
      Content,
      Challenge,
      ChallengeParticipant,
      User,
      Game,
    ]),
    CategoriesModule,
    ContentsModule,
    UsersModule,
    GamesModule,
    StatsModule,
    ChallengesModule,
    ChallengeParticipantsModule,
    AuthModule,
  ],
})
export class AppModule {}
