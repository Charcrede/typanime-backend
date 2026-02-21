import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() dto: CreateGameDto, @Req() req) {
        return this.gamesService.create(dto, req.user.id);
    }
}