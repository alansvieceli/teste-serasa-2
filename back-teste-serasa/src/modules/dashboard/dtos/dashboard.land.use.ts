import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class DashboardLandUseDto {
    @AutoMap()
    @ApiProperty()
    arableArea: number;

    @AutoMap()
    @ApiProperty()
    vegetationArea: number;
}
