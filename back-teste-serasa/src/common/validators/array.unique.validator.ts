import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsArrayUniqueConstraint implements ValidatorConstraintInterface {
    validate(array: string[]) {
        return Array.isArray(array) && new Set(array).size === array.length;
    }

    defaultMessage() {
        return 'A lista de culturas plantadas (cropsPlanted) não pode conter valores duplicados';
    }
}

export function IsArrayUnique(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsArrayUniqueConstraint,
        });
    };
}
