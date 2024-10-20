import {
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Matches,
    Min,
} from 'class-validator';
import { DocumentTypeEnum } from '@common/enums/document_type.enum';
import { StateCodeEnum } from '@common/enums/state.code.enum';
import { IsLessThanTotalArea } from '@common/validators/total.area.validator';
import { IsCPFOrCNPJ } from '@common/validators/documents.validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsArrayUnique } from '@common/validators/array.unique.validator';

export class FarmerCreateDto {
    constructor(partial?: Partial<FarmerCreateDto>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }

    @ApiProperty({
        required: true,
        enumName: 'DocumentTypeEnum',
        enum: DocumentTypeEnum,
    })
    @AutoMap()
    @IsEnum(DocumentTypeEnum, {
        message: `O tipo de documento (documentType) deve ser um valor válido [${Object.values(DocumentTypeEnum).join(', ')}]`,
    })
    @IsNotEmpty({ message: 'O tipo de documento (documentType) é obrigatório' })
    documentType: DocumentTypeEnum;

    @ApiProperty({
        required: true,
    })
    @AutoMap()
    @IsString({ message: 'O documento (document) deve ser uma string' })
    @IsNotEmpty({ message: 'O documento (document) é obrigatório' })
    @IsCPFOrCNPJ({
        message: 'O documento (document) deve ser um CPF ou CNPJ válido, de acordo com o tipo de documento',
    })
    @Matches(/^\d+$/, { message: 'O documento (document) deve conter apenas números' })
    document: string;

    @ApiProperty({
        required: true,
    })
    @AutoMap()
    @IsString({ message: 'O nome do agricultor (farmerName) deve ser uma string' })
    @IsNotEmpty({ message: 'O nome do agricultor (farmerName) é obrigatório' })
    @Length(5, 255)
    @Matches(/^[a-zA-ZÀ-ÿ\s]*$/, { message: 'Valor inválidos para o campo agricultor (farmerName)' })
    farmerName: string;

    @ApiProperty({
        required: true,
    })
    @AutoMap()
    @IsString({ message: 'O nome da fazenda (farmName) deve ser uma string' })
    @IsNotEmpty({ message: 'O nome da fazenda (farmName) é obrigatório' })
    @Length(5, 255)
    @Matches(/^[a-zA-ZÀ-ÿ\s]*$/, { message: 'Valor inválidos para o fazenda (farmName)' })
    farmName: string;

    @ApiProperty({
        required: true,
    })
    @AutoMap()
    @IsString({ message: 'A cidade (city) deve ser uma string' })
    @IsNotEmpty({ message: 'A cidade (city) é obrigatória' })
    @Length(5, 255)
    @Matches(/^[a-zA-ZÀ-ÿ\s]*$/, { message: 'Valor inválidos para o cidade (city)' })
    city: string;

    @ApiProperty({
        required: true,
        enumName: 'StateCodeEnum',
        enum: StateCodeEnum,
    })
    @AutoMap()
    @IsEnum(StateCodeEnum, {
        message: `A UF (stateCode) deve ser um valor válido [${Object.values(DocumentTypeEnum).join(', ')}]`,
    })
    @IsNotEmpty({ message: 'UF (stateCode) é obrigatório' })
    stateCode: StateCodeEnum;

    @ApiProperty({
        required: true,
    })
    @AutoMap()
    @IsNumber({}, { message: 'A área total (totalArea) deve ser um número' })
    @Min(0, { message: 'A área total (totalArea) deve ser no mínimo 0' })
    @IsNotEmpty({ message: 'A área total (totalArea) é obrigatória' })
    totalArea: number;

    @ApiProperty({
        required: true,
    })
    @AutoMap()
    @IsNumber({}, { message: 'A área arável (arableArea) deve ser um número' })
    @Min(0, { message: 'A área arável (arableArea) deve ser no mínimo 0' })
    @IsLessThanTotalArea('totalArea', { message: 'A área arável (arableArea) não pode exceder a área total' })
    @IsNotEmpty({ message: 'A área arável (arableArea) é obrigatória' })
    arableArea: number;

    @ApiProperty({
        required: true,
    })
    @AutoMap()
    @IsNumber({}, { message: 'A área de vegetação (vegetationArea) deve ser um número' })
    @Min(0, { message: 'A área de vegetação (vegetationArea) deve ser no mínimo 0' })
    @IsLessThanTotalArea('totalArea', {
        message: 'A área de vegetação (vegetationArea) não pode exceder a área total',
    })
    @IsNotEmpty({ message: 'A área de vegetação (vegetationArea) é obrigatória' })
    vegetationArea: number;

    @ApiProperty({
        required: true,
        isArray: true,
        example: ['SOJA', 'MILHO', 'ALGODAO', 'CAFE', 'CANA_ACUCAR'],
    })
    @AutoMap()
    @IsArray({ message: 'A cultura plantada (cropsPlanted) deve ser uma lista de valores' })
    @ArrayNotEmpty({ message: 'A lista de culturas plantadas (cropsPlanted) não pode estar vazia' })
    @IsIn(['SOJA', 'MILHO', 'ALGODAO', 'CAFE', 'CANA_ACUCAR'], {
        each: true,
        message:
            'A cultura plantada (cropsPlanted) deve conter valores válidos: SOJA, MILHO, ALGODAO, CAFE, CANA_ACUCAR',
    })
    @IsNotEmpty({ message: 'A cultura plantada (cropsPlanted) é obrigatória' })
    @IsArrayUnique({
        message: 'A lista de culturas plantadas (cropsPlanted) não pode conter valores duplicados',
    })
    cropsPlanted: string[];
}
