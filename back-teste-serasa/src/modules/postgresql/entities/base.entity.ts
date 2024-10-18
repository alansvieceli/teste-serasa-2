import { AutoMap } from '@automapper/classes';
import { CreateDateColumn, PrimaryColumn } from 'typeorm';

export abstract class BasePostgreSqlEntity {
    @AutoMap()
    @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
    id: UUID;

    @AutoMap()
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt?: Date;
}
