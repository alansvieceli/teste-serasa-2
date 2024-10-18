import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { FarmerEntity } from '../entities/farmer.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('PG_HOST'),
            port: this.configService.get<number>('PG_PORT'),
            username: this.configService.get<string>('PG_USERNAME'),
            password: this.configService.get<string>('PG_PASSWORD'),
            database: this.configService.get<string>('PG_DATABASE'),
            entities: [FarmerEntity],
            ssl: false,
            logging: false,
            schema: this.configService.get<string>('PG_SCHEMA'),
            namingStrategy: new SnakeNamingStrategy(),
        };
    }
}
