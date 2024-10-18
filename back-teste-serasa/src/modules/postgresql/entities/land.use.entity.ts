import { AutoMap } from '@automapper/classes';

export class DashboardLandUseEntity {
    @AutoMap()
    arableArea: number;

    @AutoMap()
    vegetationArea: number;
}
