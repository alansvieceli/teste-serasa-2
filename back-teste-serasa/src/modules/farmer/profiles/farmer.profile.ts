import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { FarmerEntity } from '@modules/postgresql/entities/farmer.entity';
import { Injectable } from '@nestjs/common';
import { FarmerCreateDto } from '../dtos/farmer.create.dto';
import { FarmerDto } from '../dtos/farmer.dto';

@Injectable()
export class FarmerProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return mapper => {
            createMap(mapper, FarmerCreateDto, FarmerEntity);
            createMap(mapper, FarmerEntity, FarmerDto);
        };
    }
}
