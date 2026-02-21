import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AppDataSource } from 'src/database/data-source';
import { Repository } from 'typeorm';
import { ChallengeParticipant } from 'src/challenge-participants/entities/challenge-participant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { Stat } from 'src/stats/entities/stat.entity';

@Injectable()
export class UsersService {
  private readonly userRepo = AppDataSource.getRepository(User);
  constructor(
  @InjectRepository(User)
  private usersRepository: Repository<User>,
  @InjectRepository(Stat)
  private statRepository: Repository<Stat>,
  @InjectRepository(Game)
  private gameRepository: Repository<Game>,
  @InjectRepository(ChallengeParticipant)
  private challengeParticipantRepository: Repository<ChallengeParticipant>,
) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    Logger.debug(`Finding user with id: ${id}`);
    if (!id || id <= 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const content = await this.userRepo.findOne({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return content;
  }

  // users.service.ts
  async getProfile(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const stat = await this.statRepository.findOne({ where: { user_id: userId } });

    // Tous les games avec le content pour avoir le type
    const games = await this.gameRepository.find({
      where: { user_id: userId },
      relations: ['content'],
    });

    // Challenges joués
    const challengeParticipations = await this.challengeParticipantRepository.find({
      where: { user_id: userId },
    });

    // Séparation par type
    const citationGames = games.filter(g => g.content?.type === 'citation');
    const synopsisGames = games.filter(g => g.content?.type === 'synopsis');

    // Calculs
    const avg = (arr: number[]) =>
      arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

    const avgWpmCitations = avg(citationGames.map(g => g.wpm));
    const avgWpmSynopsis = avg(synopsisGames.map(g => g.wpm));
    const avgAccuracy = avg(games.map(g => g.accuracy));

    // Rang global basé sur average_wpm (rank parmi tous les users)
    const rank = await this.statRepository
      .createQueryBuilder('stat')
      .where('stat.average_wpm > :wpm', { wpm: stat?.average_wpm ?? 0 })
      .getCount();

    return {
      // Infos user
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      provider: user.provider,
      createdAt: user.createdAt,

      // Stats globales
      averageWpm: stat?.average_wpm ?? 0,
      bestWpm: stat?.best_wpm ?? 0,
      gamesPlayed: stat?.games_played ?? 0,
      lastPlayedAt: stat?.last_played_at ?? null,

      // Stats par type
      citations: {
        gamesPlayed: citationGames.length,
        averageWpm: avgWpmCitations,
        averageAccuracy: avg(citationGames.map(g => g.accuracy)),
      },
      synopsis: {
        gamesPlayed: synopsisGames.length,
        averageWpm: avgWpmSynopsis,
        averageAccuracy: avg(synopsisGames.map(g => g.accuracy)),
      },

      // Challenges
      challengesPlayed: challengeParticipations.length,
      bestChallengeWpm: challengeParticipations.length
        ? Math.max(...challengeParticipations.map(cp => cp.wpm))
        : 0,
      avgChallengeWpm: avg(challengeParticipations.map(cp => cp.wpm)),

      // Rang (nombre de joueurs avec un wpm moyen supérieur + 1)
      rank: rank + 1,

      // Précision globale
      averageAccuracy: avgAccuracy,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOrCreateOAuthUser(oauthUser: {
    provider: 'google' | 'github';
    providerId: string;
    email?: string;
    name?: string;
    avatar?: string;
  }) {
    let user = await this.userRepo.findOne({
      where: {
        provider: oauthUser.provider,
        provider_id: oauthUser.providerId,
      },
    });

    if (!user) {
      user = this.userRepo.create({
        provider: oauthUser.provider,
        provider_id: oauthUser.providerId,
        email: oauthUser.email,
        username: oauthUser.name,
        avatar: oauthUser.avatar,
      });

      await this.userRepo.save(user);
    }

    return user;
  };

}
