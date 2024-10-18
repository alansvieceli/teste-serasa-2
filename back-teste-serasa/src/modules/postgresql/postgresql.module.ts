import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/config-typorm-module';
import { FarmerEntity } from './entities/farmer.entity';
import { FarmerPostgresqlService } from './services/farmer.postgresql.service';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([FarmerEntity]),
    ],
    providers: [FarmerPostgresqlService],
    exports: [FarmerPostgresqlService],
})
export class PostgreSqlModule {}
