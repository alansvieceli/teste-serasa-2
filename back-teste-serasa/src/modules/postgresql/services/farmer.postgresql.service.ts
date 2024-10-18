import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';
import { FarmerEntity } from '../entities/farmer.entity';
import { DashboardLandUseEntity } from '../entities/land.use.entity';

@Injectable()
export class FarmerPostgresqlService extends BaseService<FarmerEntity> {
    constructor(
        @InjectRepository(FarmerEntity)
        protected repository: Repository<FarmerEntity>,
    ) {
        super(repository);
    }

    async sumTotalArea(): Promise<number> {
        const result = await this.getRepository()
            .createQueryBuilder('farmers')
            .select('SUM(farmers.total_area)', 'total')
            .getRawOne();
        return result.total;
    }

    async farmsByState(): Promise<any> {
        return this.getRepository()
            .createQueryBuilder('farmers')
            .select('farmers.state_code', 'state')
            .addSelect('COUNT(farmers.id)', 'count')
            .groupBy('farmers.state_code')
            .orderBy('COUNT(farmers.id)')
            .getRawMany();
    }

    async areaByState(): Promise<any> {
        return this.getRepository()
            .createQueryBuilder('farmers')
            .select('farmers.state_code', 'state')
            .addSelect('SUM(farmers.total_area)', 'count')
            .groupBy('farmers.state_code')
            .orderBy('SUM(farmers.total_area)')
            .getRawMany();
    }

    async farmsByCropsPlanted(): Promise<any> {
        return this.getRepository()
            .createQueryBuilder('farmers')
            .select('farmers.crops_planted', 'crop')
            .addSelect('COUNT(farmers.id)', 'count')
            .groupBy('farmers.crops_planted')
            .orderBy('COUNT(farmers.id)')
            .getRawMany();
    }

    async areaByCropsPlanted(): Promise<any> {
        return this.getRepository()
            .createQueryBuilder('farmers')
            .select('farmers.crops_planted', 'crop')
            .addSelect('SUM(farmers.arable_area)', 'count')
            .groupBy('farmers.crops_planted')
            .orderBy('SUM(farmers.arable_area)')
            .getRawMany();
    }

    async getLandUse(): Promise<DashboardLandUseEntity> {
        const result = await this.getRepository()
            .createQueryBuilder('farmers')
            .select('SUM(farmers.arable_area)', 'arableArea')
            .addSelect('SUM(farmers.vegetation_area)', 'vegetationArea')
            .getRawOne();
        return {
            arableArea: result.arableArea,
            vegetationArea: result.vegetationArea,
        };
    }
}
