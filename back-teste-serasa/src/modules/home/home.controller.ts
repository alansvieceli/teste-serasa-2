import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { HomeService } from './home.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller()
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get()
    @ApiExcludeEndpoint()
    getHello(): string {
        return this.homeService.getHello();
    }
}
