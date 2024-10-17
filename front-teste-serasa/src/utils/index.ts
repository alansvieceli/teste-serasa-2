export const formatNumber = (value: string | number) => {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value))
}

export enum CropsPlantedEnum {
    SOJA = 'SOJA',
    MILHO = 'MILHO',
    ALGODAO = 'ALGODAO',
    CAFE = 'CAFE',
    CANA_ACUCAR = 'CANA_ACUCAR',
}

export const getFriendlyCropName = (crop: string): string => {
    const friendlyNames: Record<CropsPlantedEnum, string> = {
        [CropsPlantedEnum.SOJA]: 'Soja',
        [CropsPlantedEnum.MILHO]: 'Milho',
        [CropsPlantedEnum.ALGODAO]: 'Algodão',
        [CropsPlantedEnum.CAFE]: 'Café',
        [CropsPlantedEnum.CANA_ACUCAR]: 'Cana',
    }

    // Tenta converter a string para o valor correspondente do enum e retorna o nome amigável
    const cropEnumValue = crop.toUpperCase() as CropsPlantedEnum

    return friendlyNames[cropEnumValue] || crop // Retorna o nome amigável ou a string original se não houver mapeamento
}
