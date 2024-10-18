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
    farmsByCropsPlanted: Array<ValueByCrop>
    areaByCropsPlanted: Array<ValueByCrop>
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

const API_URL = process.env.REACT_APP_API_URL

if (!API_URL) {
    throw new Error('A URL da API não está definida nas variáveis de ambiente')
}

const fetchData = async <T>(endpoint: string): Promise<T> => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`)

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados de ${endpoint}`)
        }

        return await response.json()
    } catch (error) {
        console.error(`Erro ao buscar dados de ${endpoint}:`, error)
        throw error
    }
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
    return await fetchData<DashboardData>('dashboard')
}

export const fetchFarmsData = async (): Promise<Array<FarmerData>> => {
    return await fetchData<Array<FarmerData>>('farmer')
}
