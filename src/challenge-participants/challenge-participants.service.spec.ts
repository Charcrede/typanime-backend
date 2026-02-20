import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeParticipantsService } from './challenge-participants.service';

describe('ChallengeParticipantsService', () => {
  let service: ChallengeParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeParticipantsService],
    }).compile();

    service = module.get<ChallengeParticipantsService>(ChallengeParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
