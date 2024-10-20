import { createMap, forMember, mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { FarmerEntity } from '@modules/postgresql/entities/farmer.entity';
import { Injectable } from '@nestjs/common';
import { FarmerCreateDto } from '../dtos/farmer.create.dto';
import { FarmerDto } from '../dtos/farmer.dto';
import { CropsPlantedEnum } from '@common/enums/crops.planted.enum';

@Injectable()
export class FarmerProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return mapper => {
            createMap(
                mapper,
                FarmerCreateDto,
                FarmerEntity,
                forMember(
                    destination => destination.cropsPlanted,
                    mapFrom(source => source.cropsPlanted),
                ),
            );
            createMap(
                mapper,
                FarmerEntity,
                FarmerDto,
                forMember(
                    destination => destination.cropsPlanted,
                    mapFrom(source => source.cropsPlanted.map(crop => crop as CropsPlantedEnum)),
                ),
            );
        };
    }
}
