import { Injectable } from '@nestjs/common';
import { CreateChallengeParticipantDto } from './dto/create-challenge-participant.dto';
import { UpdateChallengeParticipantDto } from './dto/update-challenge-participant.dto';

@Injectable()
export class ChallengeParticipantsService {
  create(createChallengeParticipantDto: CreateChallengeParticipantDto) {
    return 'This action adds a new challengeParticipant';
  }

  findAll() {
    return `This action returns all challengeParticipants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challengeParticipant`;
  }

  update(id: number, updateChallengeParticipantDto: UpdateChallengeParticipantDto) {
    return `This action updates a #${id} challengeParticipant`;
  }

  remove(id: number) {
    return `This action removes a #${id} challengeParticipant`;
  }
}
