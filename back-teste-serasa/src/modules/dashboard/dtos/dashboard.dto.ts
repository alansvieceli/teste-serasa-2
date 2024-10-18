import { ApiProperty } from '@nestjs/swagger';
import { DashboardByCropDto } from './dashboard.by.crop.dto';
import { DashboardByStateDto } from './dashboard.by.state.dto';
import { DashboardLandUseDto } from './dashboard.land.use';

export class DashboardsDto {
    @ApiProperty()
    totalFarms: number;

    @ApiProperty()
    totalArea: number;

    @ApiProperty({ type: () => [DashboardByStateDto] })
    farmsByState: Array<DashboardByStateDto>;

    @ApiProperty({ type: () => [DashboardByStateDto] })
    areaByState: Array<DashboardByStateDto>;

    @ApiProperty({ type: () => [DashboardByCropDto] })
    farmsByCropsPlanted: Array<DashboardByCropDto>;

    @ApiProperty({ type: () => [DashboardByCropDto] })
    areaByCropsPlanted: Array<DashboardByCropDto>;

    @ApiProperty({ type: () => DashboardLandUseDto })
    landUse: DashboardLandUseDto;
}
