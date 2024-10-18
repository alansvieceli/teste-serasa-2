import { DocumentTypeEnum } from '@common/enums/document_type.enum';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

function isValidCPF(cpfValue: string): boolean {
    return cpfValue.length === 11 && cpf.isValid(cpfValue);
}

function isValidCNPJ(cnpjValue: string): boolean {
    return cnpjValue.length === 14 && cnpj.isValid(cnpjValue);
}

@ValidatorConstraint({ async: false })
export class IsCPFOrCNPJConstraint implements ValidatorConstraintInterface {
    validate(document: any, args: ValidationArguments) {
        const documentType = (args.object as any).documentType;

        if (documentType === DocumentTypeEnum.CPF) {
            return isValidCPF(document);
        } else if (documentType === DocumentTypeEnum.CNPJ) {
            return isValidCNPJ(document);
        }

        return false;
    }

    defaultMessage(args: ValidationArguments) {
        const documentType = (args.object as any).documentType;

        if (documentType === DocumentTypeEnum.CPF) {
            return 'O CPF informado é inválido';
        } else if (documentType === DocumentTypeEnum.CNPJ) {
            return 'O CNPJ informado é inválido';
        }

        return 'O tipo de documento é inválido para validação de CPF ou CNPJ';
    }
}

export function IsCPFOrCNPJ(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCPFOrCNPJConstraint,
        });
    };
}
