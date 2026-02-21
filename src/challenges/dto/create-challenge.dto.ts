import { IsInt, IsString, IsDateString, Min } from 'class-validator';

export class CreateChallengeDto {
    @IsString()
    title: string;

    @IsInt()
    content_id: number;

    @IsInt()
    @Min(10)
    duration: number;

    @IsDateString()
    expires_at: string;

    @IsInt()
    @Min(2)
    max_players: number;
}