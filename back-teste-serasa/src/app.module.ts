import { ConfigEnv } from '@common/config-module.env';
import { HealthModule } from '@modules/health/health.module';
import { HomeModule } from '@modules/home/home.module';
import { Farmer } from '@modules/farmer/farmer.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { Dashboard } from '@modules/dashboard/dashboard.module';

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                limit: 60,
                ttl: seconds(60),
                blockDuration: seconds(10),
            },
        ]),
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: ConfigEnv,
        }),
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
        HomeModule,
        HealthModule,
        Farmer,
        Dashboard,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
