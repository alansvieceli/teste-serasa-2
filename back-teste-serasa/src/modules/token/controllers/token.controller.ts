import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/user.login';

@Controller({
    path: 'auth',
    version: '1',
})
@ApiTags('auth')
export class TokenController {
    constructor(private readonly jwtService: JwtService) {}

    @Post('login')
    async login(@Body() dto: LoginDto) {
        if (dto.apiKey !== 'nWLrhNbNlUrpC7UZy5H5atSq') {
            throw new UnauthorizedException('Api Key inválida!');
        }
        const payload = { apiKey: dto.apiKey };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
