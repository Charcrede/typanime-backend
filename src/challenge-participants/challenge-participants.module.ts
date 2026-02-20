import { Module } from '@nestjs/common';
import { ChallengeParticipantsService } from './challenge-participants.service';
import { ChallengeParticipantsController } from './challenge-participants.controller';
import { ChallengeParticipant } from './entities/challenge-participant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChallengeParticipant]),
  ],
  controllers: [ChallengeParticipantsController],
  providers: [ChallengeParticipantsService],
})
export class ChallengeParticipantsModule {}
