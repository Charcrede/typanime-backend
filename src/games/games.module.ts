import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { Stat } from '../stats/entities/stat.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Game, Stat])],
    controllers: [GamesController],
    providers: [GamesService],
})
export class GamesModule {}
