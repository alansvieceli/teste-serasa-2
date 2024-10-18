import { AutoMap } from '@automapper/classes';

export class DashboardByCropEntity {
    @AutoMap()
    crop: string;

    @AutoMap()
    count: number;
}
