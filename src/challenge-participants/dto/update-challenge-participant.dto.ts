import { PartialType } from '@nestjs/swagger';
import { CreateChallengeParticipantDto } from './create-challenge-participant.dto';

export class UpdateChallengeParticipantDto extends PartialType(CreateChallengeParticipantDto) {}
