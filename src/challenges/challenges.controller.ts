import {
    Body, Controller, Get, Param, ParseIntPipe,
    Post, Req, UseGuards,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { JoinChallengeDto } from './dto/join-challenge.dto';
import { JwtAuthGuard, OptionalJwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('challenges')
export class ChallengesController {
    constructor(private readonly challengesService: ChallengesService) { }

    // GET /challenges — public, tout le monde peut voir les challenges
    @Get()
    @UseGuards(OptionalJwtAuthGuard)
    findAll(@Req() req) {
        const userId = req.user?.id  
        return this.challengesService.findAll(userId)
    }

    // GET /challenges/:id — détail d'un challenge avec participants
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.challengesService.findOne(id);
    }

    // POST /challenges — créer un challenge (connecté requis)
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CreateChallengeDto, @Req() req) {
        return this.challengesService.create(dto, req.user.id);
    }

    // POST /challenges/:id/join — soumettre un résultat (connecté requis)
    @Post(':id/join')
    @UseGuards(JwtAuthGuard)
    join(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: JoinChallengeDto,
        @Req() req,
    ) {
        return this.challengesService.join(id, dto, req.user.id);
    }
}