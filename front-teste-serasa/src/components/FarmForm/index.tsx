import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    Button,
    ButtonGroup,
    CloseButton,
    ErrorMessage,
    FieldGroup,
    FormContainer,
    HorizontalFieldGroup,
    Input,
    Label,
    Select,
} from './FarmFormStyled'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { updateFarmer } from 'src/services'
import { cnpj, cpf } from 'cpf-cnpj-validator'

type FarmerData = {
    documentType: string
    document: string
    farmerName: string
    farmName: string
    city: string
    stateCode: string
    totalArea: number
    arableArea: number
    vegetationArea: number
    cropsPlanted: string
    id: string
    createdAt?: string
}

interface EditFarmFormProps {
    data: FarmerData | undefined
    onSubmit: (data: FarmerData) => void
    onClose: () => void
}

const FarmForm: React.FC<EditFarmFormProps> = ({ data, onSubmit, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FarmerData>({
        defaultValues: data,
    })

    const validateDocument = (formData: FarmerData): boolean => {
        const documentType = formData.documentType
        const document = formData.document

        console.log(`-- ${documentType}, ${document} --`)

        if (documentType === 'CPF' && !cpf.isValid(document)) {
            toast.error('CPF inválido.')
            return false
        }

        if (documentType === 'CNPJ' && !cnpj.isValid(document)) {
            toast.error('CNPJ inválido.')
            return false
        }

        return true
    }

    const validateAreas = (formData: FarmerData): boolean => {
        const arableArea = Number(formData.arableArea)
        const vegetationArea = Number(formData.vegetationArea)
        const totalArea = Number(formData.totalArea)

        if (arableArea + vegetationArea > totalArea) {
            toast.error('A soma da Área Cultivável e da Área de Vegetação não pode ser maior que a Área Total.')
            return false
        }

        return true
    }

    const updateFarmerData = async (formData: FarmerData): Promise<void> => {
        try {
            const data = await updateFarmer(formData)
            onSubmit(data)
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const submitForm = async (formData: FarmerData) => {
        if (!validateDocument(formData)) {
            return
        }

        if (!validateAreas(formData)) {
            return
        }

        await updateFarmerData(formData)
    }

    const closeForm = () => {
        onClose()
    }

    useEffect(() => {
        Object.values(errors).forEach(error => {
            if (error) toast.error(error.message)
        })
    }, [errors])

    return (
        <FormContainer onSubmit={handleSubmit(submitForm)}>
            <HorizontalFieldGroup>
                <FieldGroup flexSize={0.2}>
                    <Label>Tipo Documento</Label>
                    <Select
                        hasError={!!errors.documentType}
                        {...register('documentType', {
                            required: 'Selecione o tipo de documento.',
                        })}
                    >
                        <option value="CNPJ">CNPJ</option>
                        <option value="CPF">CPF</option>
                    </Select>
                    {errors.documentType && <ErrorMessage>{errors.documentType.message}</ErrorMessage>}
                </FieldGroup>
                <FieldGroup flexSize={0.8}>
                    <Label>Documento</Label>
                    <Input
                        hasError={!!errors.document}
                        {...register('document', {
                            required: 'O Documento é obrigatório.',
                        })}
                        maxLength={11}
                        onKeyDown={e => {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                e.preventDefault()
                            }
                        }}
                    />
                    {errors.document && <ErrorMessage>{errors.document.message}</ErrorMessage>}
                </FieldGroup>
            </HorizontalFieldGroup>
            <FieldGroup>
                <Label>Nome do Produtor</Label>
                <Input
                    hasError={!!errors.farmerName}
                    {...register('farmerName', {
                        required: 'O nome do Produtor é obrigatório',
                        minLength: {
                            value: 5,
                            message: 'O nome do Produtor deve ter pelo menos 5 caracteres',
                        },
                    })}
                    maxLength={255}
                />
                {errors.farmerName && <ErrorMessage>{errors.farmerName.message}</ErrorMessage>}
            </FieldGroup>
            <FieldGroup>
                <Label>Nome da Fazenda</Label>
                <Input
                    hasError={!!errors.farmName}
                    {...register('farmName', {
                        required: 'O nome da Fazenda é obrigatório',
                        minLength: {
                            value: 5,
                            message: 'O nome da Fazenda deve ter pelo menos 5 caracteres',
                        },
                    })}
                    maxLength={255}
                />
                {errors.farmName && <ErrorMessage>{errors.farmName.message}</ErrorMessage>}
            </FieldGroup>
            <HorizontalFieldGroup>
                <FieldGroup flexSize={0.8}>
                    <Label>Cidade</Label>
                    <Input
                        hasError={!!errors.city}
                        {...register('city', {
                            required: 'Cidade é obrigatório',
                            minLength: {
                                value: 3,
                                message: 'Cidade deve ter pelo menos 3 caracteres',
                            },
                        })}
                        maxLength={100}
                    />
                    {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
                </FieldGroup>
                <FieldGroup flexSize={0.2}>
                    <Label>UF</Label>
                    <Select
                        hasError={!!errors.stateCode}
                        {...register('stateCode', {
                            required: 'Selecione a UF.',
                        })}
                    >
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                    </Select>
                    {errors.stateCode && <ErrorMessage>{errors.stateCode.message}</ErrorMessage>}
                </FieldGroup>
            </HorizontalFieldGroup>
            <HorizontalFieldGroup>
                <FieldGroup>
                    <Label>Área Total</Label>
                    <Input
                        type="number"
                        step="0.01"
                        hasError={!!errors.totalArea}
                        {...register('totalArea', {
                            required: 'A Área Total é obrigatória.',
                            validate: value => value > 0 || 'A Área Total deve ser maior que zero.',
                        })}
                    />
                    {errors.totalArea && <ErrorMessage>{errors.totalArea.message}</ErrorMessage>}
                </FieldGroup>

                <FieldGroup>
                    <Label>Área Cultivável</Label>
                    <Input type="number" step="0.01" hasError={!!errors.arableArea} {...register('arableArea', { required: true })} />
                </FieldGroup>

                <FieldGroup>
                    <Label>Área de Vegetação</Label>
                    <Input
                        type="number"
                        step="0.01"
                        hasError={!!errors.vegetationArea}
                        {...register('vegetationArea', { required: true })}
                    />
                </FieldGroup>
            </HorizontalFieldGroup>
            <FieldGroup>
                <Label>Plantações</Label>
                <Select
                    hasError={!!errors.cropsPlanted}
                    {...register('cropsPlanted', {
                        required: 'Selecione uma Plantação.',
                    })}
                >
                    <option value="SOJA">Soja</option>
                    <option value="MILHO">Milho</option>
                    <option value="ALGODAO">Algodão</option>
                    <option value="CAFE">Café</option>
                    <option value="CANA_ACUCAR">Cana-de-Açúcar</option>
                </Select>
                {errors.cropsPlanted && <ErrorMessage>{errors.cropsPlanted.message}</ErrorMessage>}
            </FieldGroup>
            <ButtonGroup>
                <Button type="submit">Salvar</Button>
                <CloseButton type="button" onClick={closeForm}>
                    Fechar
                </CloseButton>
            </ButtonGroup>
        </FormContainer>
    )
}

export default FarmForm
