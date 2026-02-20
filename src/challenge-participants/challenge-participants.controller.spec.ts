import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeParticipantsController } from './challenge-participants.controller';
import { ChallengeParticipantsService } from './challenge-participants.service';

describe('ChallengeParticipantsController', () => {
  let controller: ChallengeParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeParticipantsController],
      providers: [ChallengeParticipantsService],
    }).compile();

    controller = module.get<ChallengeParticipantsController>(ChallengeParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
