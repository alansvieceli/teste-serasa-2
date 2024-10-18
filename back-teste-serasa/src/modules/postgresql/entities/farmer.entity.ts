import { Column, Entity } from 'typeorm';
import { BasePostgreSqlEntity } from './base.entity';
import { DocumentTypeEnum } from '@common/enums/document_type.enum';
import { StateCodeEnum } from '@common/enums/state.code.enum';
import { CropsPlantedEnum } from '@common/enums/crops.planted.enum';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'farmers' })
export class FarmerEntity extends BasePostgreSqlEntity {
    @AutoMap()
    @Column({
        type: 'enum',
        enum: DocumentTypeEnum,
        nullable: false,
    })
    documentType: DocumentTypeEnum;

    @AutoMap()
    @Column({ type: 'varchar', length: 14, nullable: false })
    document: string;

    @AutoMap()
    @Column({ type: 'varchar', length: 255, nullable: false })
    farmerName: string;

    @AutoMap()
    @Column({ type: 'varchar', length: 255, nullable: false })
    farmName: string;

    @AutoMap()
    @Column({ type: 'varchar', length: 255, nullable: false })
    city: string;

    @AutoMap()
    @Column({
        type: 'enum',
        enum: StateCodeEnum,
        nullable: false,
    })
    stateCode: StateCodeEnum;

    @AutoMap()
    @Column({
        type: 'numeric',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        },
    })
    totalArea: number;

    @AutoMap()
    @Column({
        type: 'numeric',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        },
    })
    arableArea: number;

    @AutoMap()
    @Column({
        type: 'numeric',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        },
    })
    vegetationArea: number;

    @AutoMap()
    @Column({
        type: 'enum',
        enum: CropsPlantedEnum,
        nullable: false,
    })
    cropsPlanted: CropsPlantedEnum;
}
