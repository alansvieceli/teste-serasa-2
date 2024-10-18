import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, ButtonGroup, CloseButton, FieldGroup, FormContainer, Input, Input2, Label, Select } from './FarmFormStyled'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { updateFarmer } from 'src/services'

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

    const submitForm = async (formData: FarmerData) => {
        if (Number(formData.arableArea) + Number(formData.vegetationArea) > Number(formData.totalArea)) {
            toast.error('Erro: A soma da Área Cultivável e da Área de Vegetação não pode ser maior que a Área Total.')
        } else {
            try {
                updateFarmer(formData)
                onSubmit(formData)
            } catch (error) {
                toast.error('Erro ao salvar dados')
            }
        }
    }

    const closeForm = () => {
        onClose()
    }

    useEffect(() => {
        if (errors.farmerName) {
            toast.error(errors.farmerName.message)
        }
        if (errors.farmName) {
            toast.error(errors.farmName.message)
        }
        if (errors.city) {
            toast.error(errors.city.message)
        }
    }, [errors.farmerName, errors.farmName, errors.city])

    return (
        <FormContainer onSubmit={handleSubmit(submitForm)}>
            <FieldGroup>
                <Label>Tipo de Documento</Label>
                <Select {...register('documentType', { required: true })}>
                    <option value="CNPJ">CNPJ</option>
                    <option value="CPF">CPF</option>
                </Select>
            </FieldGroup>
            <FieldGroup>
                <Label>Documento</Label>
                <Input {...register('document', { required: true })} />
            </FieldGroup>

            <FieldGroup>
                <Label>Nome do Produtor</Label>
                <Input2
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
            </FieldGroup>

            <FieldGroup>
                <Label>Nome da Fazenda</Label>
                <Input2
                    hasError={!!errors.farmName}
                    {...register('farmName', {
                        required: 'O nome do Fazenda é obrigatório',
                        minLength: {
                            value: 5,
                            message: 'O nome do Fazenda deve ter pelo menos 5 caracteres',
                        },
                    })}
                    maxLength={255}
                />
            </FieldGroup>

            <FieldGroup>
                <Label>Cidade</Label>
                <Input2
                    hasError={!!errors.city}
                    {...register('city', {
                        required: 'Cidade é obrigatório',
                        minLength: {
                            value: 5,
                            message: 'Cidade deve ter pelo menos 5 caracteres',
                        },
                    })}
                    maxLength={100}
                />
            </FieldGroup>
            <FieldGroup>
                <Label>Estado</Label>
                <Select {...register('stateCode', { required: true })}>
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
            </FieldGroup>

            <FieldGroup>
                <Label>Área Total</Label>
                <Input type="number" step="0.01" {...register('totalArea', { required: true })} />
            </FieldGroup>
            <FieldGroup>
                <Label>Área Cultivável</Label>
                <Input type="number" step="0.01" {...register('arableArea', { required: true })} />
            </FieldGroup>
            <FieldGroup>
                <Label>Área de Vegetação</Label>
                <Input type="number" step="0.01" {...register('vegetationArea', { required: true })} />
            </FieldGroup>

            <FieldGroup>
                <Label>Plantações</Label>
                <Select {...register('cropsPlanted', { required: true })}>
                    <option value="SOJA">Soja</option>
                    <option value="MILHO">Milho</option>
                    <option value="ALGODAO">Algodão</option>
                    <option value="CAFE">Café</option>
                    <option value="CANA_ACUCAR">Cana-de-Açúcar</option>
                </Select>
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
