import {
    BadRequestException, Injectable, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { ChallengeParticipant } from '../challenge-participants/entities/challenge-participant.entity';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { JoinChallengeDto } from './dto/join-challenge.dto';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectRepository(Challenge)
        private challengesRepository: Repository<Challenge>,
        @InjectRepository(ChallengeParticipant)
        private participantsRepository: Repository<ChallengeParticipant>,
    ) {}

    // Tous les challenges non expirés, triés par date de création desc
    findAll(): Promise<Challenge[]> {
        return this.challengesRepository.find({
            where: { expires_at: MoreThan(new Date()) },
            relations: ['content', 'participants', 'participants.user'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Challenge> {
  const challenge = await this.challengesRepository.findOne({
    where: { id },
    relations: [
      'content',
      'participants',
      'participants.user', // 👈 clé ici
    ],
  });

  if (!challenge) {
    throw new NotFoundException('Challenge introuvable');
  }

  return challenge;
}
    async create(dto: CreateChallengeDto, userId: number): Promise<Challenge> {
        const challenge = this.challengesRepository.create({
            title: dto.title,
            content_id: dto.content_id,
            duration: dto.duration,
            expires_at: new Date(dto.expires_at),
            max_players: dto.max_players,
        });
        return this.challengesRepository.save(challenge);
    }

    async join(
        challengeId: number,
        dto: JoinChallengeDto,
        userId: number,
    ): Promise<ChallengeParticipant> {
        const challenge = await this.challengesRepository.findOne({
            where: { id: challengeId },
            relations: ['participants'],
        });
        if (!challenge) throw new NotFoundException('Challenge introuvable');

        // Vérifier expiration
        if (new Date(challenge.expires_at) < new Date()) {
            throw new BadRequestException('Ce challenge est expiré');
        }

        // Vérifier si complet
        if (challenge.participants.length >= challenge.max_players) {
            throw new BadRequestException('Ce challenge est complet');
        }

        // Si l'utilisateur a déjà participé → mettre à jour son score si meilleur
        const existing = await this.participantsRepository.findOne({
            where: { challenge_id: challengeId, user_id: userId },
        });

        if (existing) {
            if (dto.wpm > existing.wpm) {
                existing.wpm = dto.wpm;
                existing.accuracy = dto.accuracy;
                return this.participantsRepository.save(existing);
            }
            return existing; // Score pas amélioré, on retourne l'existant sans modifier
        }

        // Nouvelle participation
        const participant = this.participantsRepository.create({
            challenge_id: challengeId,
            user_id: userId,
            wpm: dto.wpm,
            accuracy: dto.accuracy,
        });
        return this.participantsRepository.save(participant);
    }
}
