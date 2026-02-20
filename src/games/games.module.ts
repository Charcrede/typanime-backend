import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { Type } from 'class-transformer';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]), 
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
