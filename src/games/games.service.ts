import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { Stat } from '../stats/entities/stat.entity';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        @InjectRepository(Stat)
        private statRepository: Repository<Stat>,
    ) {}

    async create(dto: CreateGameDto, userId: number): Promise<Game> {
        // 1. Enregistrer la partie
        const game = this.gamesRepository.create({
            user_id: userId,
            content_id: dto.content_id,
            wpm: dto.wpm,
            accuracy: dto.accuracy,
            duration: dto.duration,
            mode: dto.mode,
        });
        await this.gamesRepository.save(game);

        // 2. Mettre à jour les stats de l'utilisateur
        await this.updateStats(userId);

        return game;
    }

    private async updateStats(userId: number): Promise<void> {
        const games = await this.gamesRepository.find({ where: { user_id: userId } });

        if (!games.length) return;

        const totalWpm = games.reduce((sum, g) => sum + g.wpm, 0);
        const avgWpm = Math.round(totalWpm / games.length);
        const bestWpm = Math.max(...games.map(g => g.wpm));
        const lastGame = games.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

        let stat = await this.statRepository.findOne({ where: { user_id: userId } });

        if (stat) {
            stat.average_wpm = avgWpm;
            stat.best_wpm = bestWpm;
            stat.games_played = games.length;
            stat.last_played_at = lastGame.createdAt;
            await this.statRepository.save(stat);
        } else {
            // Créer la stat si elle n'existe pas encore
            const newStat = this.statRepository.create({
                user_id: userId,
                average_wpm: avgWpm,
                best_wpm: bestWpm,
                games_played: games.length,
                last_played_at: lastGame.createdAt,
            });
            await this.statRepository.save(newStat);
        }
    }
}