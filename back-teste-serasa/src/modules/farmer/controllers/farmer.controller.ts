import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { LocationInterceptor } from '@common/interceptors/location.interceptor';
import { FarmerService } from '../services/farmer.service';
import { FarmerCreateDto } from '../dtos/farmer.create.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FarmerDto } from '../dtos/farmer.dto';
import { UUIDValidationPipe } from '@common/pipes/uuid.validator.pipe';
import { FarmerUpdateDto } from '../dtos/farmer.update.dto';

@Controller({
    path: 'farmer',
    version: '1',
})
@ApiTags('Farmer / CRUD')
export class FarmerController {
    constructor(private readonly ruralProducerService: FarmerService) {}

    @Post()
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        description: 'Criar um produtor rural/fazendeiro',
    })
    @UseInterceptors(LocationInterceptor)
    async create(@Body() userCreateDto: FarmerCreateDto): Promise<UUID> {
        return this.ruralProducerService.create(userCreateDto);
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Buscar todos os produtores rural/fazendeiro',
        type: FarmerDto,
        isArray: false,
    })
    async getAll(): Promise<Array<FarmerDto>> {
        return this.ruralProducerService.getAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Buscar um produtor rural/fazendeiro pelo ID',
        type: FarmerDto,
        isArray: false,
    })
    @ApiResponse({
        status: 204,
        description: 'Nenhum produtor rural/fazendeiro encontrado',
    })
    async getById(@Param('id', UUIDValidationPipe) id: UUID): Promise<FarmerDto | null> {
        return this.ruralProducerService.getById(id);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Deleta um produtor rural/fazendeiro pelo ID',
    })
    @ApiResponse({
        status: 404,
        description: 'Nenhum produtor rural/fazendeiro encontrado',
    })
    async deleteById(@Param('id', UUIDValidationPipe) id: UUID): Promise<void> {
        return this.ruralProducerService.deleteById(id);
    }

    @Put(':id')
    @ApiResponse({
        status: 200,
        description: 'Atualizar toda entidade de produtor rural/fazendeiro',
        type: FarmerDto,
        isArray: false,
    })
    @ApiResponse({
        status: 404,
        description: 'Nenhum produtor rural/fazendeiro encontrado',
    })
    async update(
        @Param('id', UUIDValidationPipe) id: UUID,
        @Body() farmerUpdateDto: FarmerUpdateDto,
    ): Promise<FarmerDto> {
        return this.ruralProducerService.update(id, farmerUpdateDto);
    }

    @Patch(':id')
    async patch(
        @Param('id') id: UUID,
        @Body() farmerUpdateDto: Partial<FarmerUpdateDto>,
    ): Promise<FarmerDto> {
        return await this.ruralProducerService.patch(id, farmerUpdateDto);
    }
}
