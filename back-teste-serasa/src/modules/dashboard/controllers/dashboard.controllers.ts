import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService } from '../services/dashboard.service';
import { DashboardsDto } from '../dtos/dashboard.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller({
    path: 'dashboard',
    version: '1',
})
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Buscar os dados do Dashboard',
        type: DashboardsDto,
        isArray: false,
    })
    async getFarmsSummary(): Promise<DashboardsDto> {
        try {
            const [totalFarms, totalArea, farmsByState, farmsByCropsPlanted, landUse] = await Promise.all([
                this.dashboardService.countFarms(),
                this.dashboardService.sumTotalArea(),
                this.dashboardService.farmsByState(),
                this.dashboardService.farmsByCropsPlanted(),
                this.dashboardService.landUse(),
            ]);

            return {
                totalFarms: Number(totalFarms),
                totalArea: Number(totalArea),
                farmsByState,
                farmsByCropsPlanted,
                landUse,
            };
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            throw new BadRequestException('Erro ao buscar dados do dashboard');
        }
    }
}
