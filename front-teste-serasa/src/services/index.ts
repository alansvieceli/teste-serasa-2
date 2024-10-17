export interface ValueByCrop {
    crop: string
    count: number
}

export interface ValueByState {
    state: string
    count: number
}

export interface LandUse {
    arableArea: number
    vegetationArea: number
}

export interface DashboardData {
    totalFarms: number
    totalArea: string
    farmsByState: Array<ValueByState>
    areaByState: Array<ValueByState>
    farmsByCropsplanted: Array<ValueByCrop>
    areaByCropsplante: Array<ValueByCrop>
    landUse: LandUse
}

export interface FarmerData {
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
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
    const API_URL = process.env.REACT_APP_API_URL

    if (!API_URL) {
        throw new Error('A URL da API não está definida nas variáveis de ambiente')
    }

    try {
        const response = await fetch(`${API_URL}/dashboard`)

        if (!response.ok) {
            throw new Error('Erro ao buscar os dados do dashboard')
        }

        const result: DashboardData = await response.json()
        return result
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error)
        throw error
    }
}

export const fetchFarmsData = async (): Promise<Array<FarmerData>> => {
    const API_URL = process.env.REACT_APP_API_URL

    if (!API_URL) {
        throw new Error('A URL da API não está definida nas variáveis de ambiente')
    }

    try {
        const response = await fetch(`${API_URL}/farmer`)

        if (!response.ok) {
            throw new Error('Erro ao buscar os dados do agricultor')
        }

        const result: Array<FarmerData> = await response.json()
        return result
    } catch (error) {
        console.error('Erro ao buscar dados do agricultor:', error)
        throw error
    }
}
