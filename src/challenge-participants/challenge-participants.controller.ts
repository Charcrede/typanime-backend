import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChallengeParticipantsService } from './challenge-participants.service';
import { CreateChallengeParticipantDto } from './dto/create-challenge-participant.dto';
import { UpdateChallengeParticipantDto } from './dto/update-challenge-participant.dto';

@Controller('challenge-participants')
export class ChallengeParticipantsController {
  constructor(private readonly challengeParticipantsService: ChallengeParticipantsService) {}

  @Post()
  create(@Body() createChallengeParticipantDto: CreateChallengeParticipantDto) {
    return this.challengeParticipantsService.create(createChallengeParticipantDto);
  }

  @Get()
  findAll() {
    return this.challengeParticipantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeParticipantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallengeParticipantDto: UpdateChallengeParticipantDto) {
    return this.challengeParticipantsService.update(+id, updateChallengeParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengeParticipantsService.remove(+id);
  }
}
