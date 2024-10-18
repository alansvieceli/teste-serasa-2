import { AutoMap } from '@automapper/classes';
import { FarmerCreateDto } from './farmer.create.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FarmerDto extends FarmerCreateDto {
    @ApiProperty({
        required: true,
    })
    @AutoMap()
    id: UUID;

    @ApiProperty({
        required: true,
    })
    @AutoMap()
    createdAt?: Date;
}
