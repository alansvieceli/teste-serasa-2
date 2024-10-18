import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService } from '../services/dashboard.service';
import { DashboardsDto } from '../dtos/dashboard.dto';

@Controller({
    path: 'dashboard',
    version: '1',
})
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
            const [
                totalFarms,
                totalArea,
                farmsByState,
                areaByState,
                farmsByCropsPlanted,
                areaByCropsPlanted,
                landUse,
            ] = await Promise.all([
                this.dashboardService.countFarms(),
                this.dashboardService.sumTotalArea(),
                this.dashboardService.farmsByState(),
                this.dashboardService.areaByState(),
                this.dashboardService.farmsByCropsPlanted(),
                this.dashboardService.areaByCropsPlanted(),
                this.dashboardService.landUse(),
            ]);

            return {
                totalFarms: Number(totalFarms),
                totalArea: Number(totalArea),
                farmsByState,
                areaByState,
                farmsByCropsPlanted,
                areaByCropsPlanted,
                landUse,
            };
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            throw new BadRequestException('Erro ao buscar dados do dashboard');
        }
    }
}
