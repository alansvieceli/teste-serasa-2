import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    constructor(partial: Partial<LoginDto>) {
        Object.assign(this, partial);
    }

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
    })
    apiKey: string;
}
