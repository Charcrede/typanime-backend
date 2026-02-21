import { IsInt, IsNumber, Min, Max } from 'class-validator';

export class JoinChallengeDto {
    @IsInt()
    @Min(0)
    wpm: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    accuracy: number;
}