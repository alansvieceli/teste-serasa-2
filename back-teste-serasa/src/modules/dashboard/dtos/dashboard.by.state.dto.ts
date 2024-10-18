import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class DashboardByStateDto {
    @AutoMap()
    @ApiProperty()
    state: string;

    @AutoMap()
    @ApiProperty()
    @Transform(({ value }) => Number(value))
    count: number;
}
