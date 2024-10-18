import { createMap, forMember, mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { DashboardLandUseEntity } from '@modules/postgresql/entities/land.use.entity';
import { Injectable } from '@nestjs/common';
import { DashboardLandUseDto } from '../dtos/dashboard.land.use';
import { DashboardByCropEntity } from '@modules/postgresql/entities/by.crop.entity';
import { DashboardByCropDto } from '../dtos/dashboard.by.crop.dto';
import { DashboardByStateEntity } from '@modules/postgresql/entities/by.state.entity';
import { DashboardByStateDto } from '../dtos/dashboard.by.state.dto';

@Injectable()
export class DashboardProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return mapper => {
            createMap(
                mapper,
                DashboardLandUseEntity,
                DashboardLandUseDto,
                forMember(
                    destination => destination.arableArea,
                    mapFrom(source => {
                        return parseFloat(source.arableArea.toString());
                    }),
                ),
                forMember(
                    destination => destination.vegetationArea,
                    mapFrom(source => {
                        return parseFloat(source.vegetationArea.toString());
                    }),
                ),
            );
            createMap(
                mapper,
                DashboardByCropEntity,
                DashboardByCropDto,
                forMember(
                    destination => destination.count,
                    mapFrom(source => {
                        return parseFloat(source.count.toString());
                    }),
                ),
            );
            createMap(
                mapper,
                DashboardByStateEntity,
                DashboardByStateDto,
                forMember(
                    destination => destination.count,
                    mapFrom(source => {
                        return parseFloat(source.count.toString());
                    }),
                ),
            );
        };
    }
}
