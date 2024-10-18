import { Module } from '@nestjs/common';
import { FarmerController } from './controllers/farmer.controller';
import { FarmerService } from './services/farmer.service';
import { FarmerProfile } from './profiles/farmer.profile';
import { PostgreSqlModule } from '@modules/postgresql/postgresql.module';

@Module({
    imports: [PostgreSqlModule],
    controllers: [FarmerController],
    providers: [FarmerProfile, FarmerService],
})
export class Farmer {}
