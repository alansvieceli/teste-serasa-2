import { FarmerPostgresqlService } from '@modules/postgresql/services/farmer.postgresql.service';
import { Injectable } from '@nestjs/common';
import { DashboardByStateDto } from '../dtos/dashboard.by.state.dto';
import { DashboardByCropDto } from '../dtos/dashboard.by.crop.dto';
import { DashboardLandUseDto } from '../dtos/dashboard.land.use';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DashboardLandUseEntity } from '@modules/postgresql/entities/land.use.entity';
import { DashboardByCropEntity } from '@modules/postgresql/entities/by.crop.entity';
import { DashboardByStateEntity } from '@modules/postgresql/entities/by.state.entity';

@Injectable()
export class DashboardService {
    constructor(
        private readonly farmerPostgresqlService: FarmerPostgresqlService,
        @InjectMapper()
        private readonly mapper: Mapper,
    ) {}

    // Total de fazendas em quantidade
    async countFarms(): Promise<number> {
        return this.farmerPostgresqlService.count();
    }

    // Total de fazendas em hectares (área total)
    async sumTotalArea(): Promise<number> {
        return this.farmerPostgresqlService.sumTotalArea();
    }

    // Gráfico de pizza por estado.
    async farmsByState(): Promise<Array<DashboardByStateDto>> {
        const entity = await this.farmerPostgresqlService.farmsByState();
        return this.mapper.mapArrayAsync(entity, DashboardByStateEntity, DashboardByStateDto);
    }

    async areaByState(): Promise<Array<DashboardByStateDto>> {
        const entity = await this.farmerPostgresqlService.areaByState();
        return this.mapper.mapArrayAsync(entity, DashboardByStateEntity, DashboardByStateDto);
    }

    // Gráfico de pizza por cultura.
    async farmsByCropsPlanted(): Promise<Array<DashboardByCropDto>> {
        const entity = await this.farmerPostgresqlService.farmsByCropsPlanted();
        return this.mapper.mapArrayAsync(entity, DashboardByCropEntity, DashboardByCropDto);
    }

    async areaByCropsPlanted(): Promise<Array<DashboardByCropDto>> {
        const entity = await this.farmerPostgresqlService.areaByCropsPlanted();
        return this.mapper.mapArrayAsync(entity, DashboardByCropEntity, DashboardByCropDto);
    }

    // Gráfico de pizza por uso de solo (Área agricultável e vegetação)
    async landUse(): Promise<DashboardLandUseDto> {
        const entity = await this.farmerPostgresqlService.getLandUse();
        return this.mapper.mapAsync(entity, DashboardLandUseEntity, DashboardLandUseDto);
    }
}
