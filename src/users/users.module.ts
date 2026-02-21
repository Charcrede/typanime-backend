import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Type } from 'class-transformer';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeParticipant } from 'src/challenge-participants/entities/challenge-participant.entity';
import { Game } from 'src/games/entities/game.entity';
import { Stat } from 'src/stats/entities/stat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Stat, Game, ChallengeParticipant])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
