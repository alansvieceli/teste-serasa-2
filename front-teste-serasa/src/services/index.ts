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

export interface FarmerUpdateData {
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
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1'

console.log(`- ${API_URL}`)

if (!API_URL) {
    throw new Error('A URL da API não está definida nas variáveis de ambiente')
}

function removeNonNumeric(str: string): string {
    return str.replace(/\D/g, '') // \D corresponde a qualquer caractere que não seja um dígito (0-9)
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

const fetchDataURL = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados de ${url}`)
        }

        return (await response.json()) as T
    } catch (error) {
        console.error(`Erro ao buscar dados de ${url}:`, error)
        throw error
    }
}

const deleteData = async (endpoint: string, id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error(`Erro ao deletar dados ${endpoint}/${id}`)
        }
    } catch (error) {
        console.error(`Erro ao deletar dados ${endpoint}/${id}:`, error)
        throw error
    }
}

const patchData = async <T, R>(endpoint: string, id: string, data: T): Promise<R> => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error(`Erro ao atualziar dados ${endpoint}/${id}`)
        }

        return response.json()
    } catch (error) {
        console.error(`Erro ao atualziar dados ${endpoint}/${id}:`, error)
        throw error
    }
}

const postData = async <T, R>(endpoint: string, data: T): Promise<R> => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const errorBody = await response.json()
            throw new Error(errorBody.message)
        }
        const location = response.headers.get('Location')

        if (!location) {
            throw new Error('Cabeçalho Location não encontrado.')
        }

        return fetchDataURL<R>(`${location}`)
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
    return await fetchData<DashboardData>('dashboard')
}

export const fetchFarmsData = async (): Promise<Array<FarmerData>> => {
    return await fetchData<Array<FarmerData>>('farmer')
}

export const deleteFarmer = async (id: string): Promise<void> => {
    await deleteData('farmer', id)
}

export const updateFarmer = async (data: FarmerData): Promise<FarmerData> => {
    const updateData: FarmerUpdateData = {
        documentType: data.documentType,
        document: removeNonNumeric(data.document),
        farmerName: data.farmName,
        farmName: data.farmerName,
        city: data.city,
        stateCode: data.stateCode,
        totalArea: Number(data.totalArea),
        arableArea: Number(data.arableArea),
        vegetationArea: Number(data.vegetationArea),
        cropsPlanted: data.cropsPlanted,
    }

    if (data.id.trim() === '') {
        return await postData<FarmerUpdateData, FarmerData>('farmer', updateData)
    } else {
        return await patchData<FarmerUpdateData, FarmerData>('farmer', data.id, updateData)
    }
}
