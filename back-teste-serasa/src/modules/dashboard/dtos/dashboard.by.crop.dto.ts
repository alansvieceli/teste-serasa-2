import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class DashboardByCropDto {
    @ApiProperty()
    @AutoMap()
    crop: string;

    @ApiProperty()
    @AutoMap()
    count: number;
}
