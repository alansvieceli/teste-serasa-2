import { AutoMap } from '@automapper/classes';

export class DashboardByStateEntity {
    @AutoMap()
    state: string;

    @AutoMap()
    count: number;
}
