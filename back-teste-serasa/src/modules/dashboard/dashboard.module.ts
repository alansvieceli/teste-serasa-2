import { PostgreSqlModule } from '@modules/postgresql/postgresql.module';
import { Module } from '@nestjs/common';
import { DashboardService } from './services/dashboard.service';
import { DashboardController } from './controllers/dashboard.controllers';
import { DashboardProfile } from './profiles/dashboard.profile';

@Module({
    imports: [PostgreSqlModule],
    controllers: [DashboardController],
    providers: [DashboardProfile, DashboardService],
})
export class Dashboard {}
