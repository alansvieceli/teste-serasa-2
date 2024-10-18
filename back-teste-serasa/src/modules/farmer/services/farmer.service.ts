import { Injectable, NotFoundException } from '@nestjs/common';
import { FarmerCreateDto } from '../dtos/farmer.create.dto';
import { InjectMapper } from '@automapper/nestjs';
import { FarmerPostgresqlService } from '@modules/postgresql/services/farmer.postgresql.service';
import { Mapper } from '@automapper/core';
import { FarmerEntity } from '@modules/postgresql/entities/farmer.entity';
import { FarmerDto } from '../dtos/farmer.dto';
import { FarmerUpdateDto } from '../dtos/farmer.update.dto';

@Injectable()
export class FarmerService {
    constructor(
        private readonly farmerPostgresqlService: FarmerPostgresqlService,
        @InjectMapper()
        private readonly mapper: Mapper,
    ) {}

    private async getEntityById(id: UUID): Promise<FarmerEntity> {
        const farmerEntity = await this.farmerPostgresqlService.findOne({ where: { id } });
        if (!farmerEntity) {
            throw new NotFoundException('Nenhum registro encontrado');
        }
        return farmerEntity;
    }

    async create(farmerCreateDto: FarmerCreateDto): Promise<UUID> {
        const farmerEntity = this.mapper.map(farmerCreateDto, FarmerCreateDto, FarmerEntity);
        const insertResult = await this.farmerPostgresqlService.insert(farmerEntity);
        console.log(`1. ${insertResult}`);
        return insertResult.identifiers[0].id;
    }

    async getAll(): Promise<Array<FarmerDto>> {
        const farmerEntity = await this.farmerPostgresqlService.find();
        return this.mapper.mapArrayAsync(farmerEntity, FarmerEntity, FarmerDto);
    }

    async getById(id: UUID): Promise<FarmerDto> {
        const farmerEntity = await this.getEntityById(id);
        return this.mapper.mapAsync(farmerEntity, FarmerEntity, FarmerDto);
    }

    async deleteById(id: UUID): Promise<void> {
        const deleteResult = await this.farmerPostgresqlService.delete({ id });
        if (!deleteResult.affected) {
            throw new NotFoundException('Nenhum registro encontrado');
        }
    }

    async update(id: UUID, farmerUpdateDto: FarmerUpdateDto): Promise<FarmerDto> {
        const farmerEntity = await this.getEntityById(id);
        const updatedFarmer = { ...farmerEntity, ...farmerUpdateDto };

        await this.farmerPostgresqlService.save(updatedFarmer);

        return this.mapper.mapAsync(updatedFarmer, FarmerEntity, FarmerDto);
    }

    async patch(id: UUID, farmerUpdateDto: Partial<FarmerUpdateDto>): Promise<FarmerDto> {
        const farmerEntity = await this.getEntityById(id);
        const updatedFarmer = { ...farmerEntity, ...farmerUpdateDto };
        await this.farmerPostgresqlService.save(updatedFarmer);

        return this.mapper.mapAsync(updatedFarmer, FarmerEntity, FarmerDto);
    }
}
