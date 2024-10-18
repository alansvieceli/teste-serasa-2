import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsLessThanTotalArea(property: string, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isLessThanTotalArea',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return (
                        typeof value === 'number' && typeof relatedValue === 'number' && value <= relatedValue
                    );
                },
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${args.property} não deve exceder ${relatedPropertyName}`;
                },
            },
        });
    };
}
