import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Stat } from './entities/stat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stat]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
