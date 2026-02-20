import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Content } from '../contents/entities/content.entity';
import { User } from '../users/entities/user.entity';
import { Game } from '../games/entities/game.entity';
import { Stat } from '../stats/entities/stat.entity';
import { Challenge } from '../challenges/entities/challenge.entity';
import { ChallengeParticipant } from '../challenge-participants/entities/challenge-participant.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'ton_user',
  password: process.env.DB_PASSWORD || 'ton_mdp',
  database: process.env.DB_NAME || 'ton_db',
  synchronize: true,
  logging: false,
  entities: [
    Category,
    Content,
    User,
    Game,
    Stat,
    Challenge,
    ChallengeParticipant
  ],
});
