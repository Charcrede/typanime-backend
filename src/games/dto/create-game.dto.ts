import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateGameDto {
    @IsInt()
    content_id: number;

    @IsInt()
    @Min(0)
    wpm: number;

    @IsNumber()
    @Min(0)
    accuracy: number;

    @IsInt()
    @Min(0)
    duration: number;

    @IsString()
    mode: string; // 'citation' | 'synopsis'
}