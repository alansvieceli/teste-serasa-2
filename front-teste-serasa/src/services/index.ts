import store, { setToken } from 'src/store'

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
    farmsByCropsPlanted: Array<ValueByCrop>
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
    cropsPlanted: string[]
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
    cropsPlanted: string[]
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1'
const MAX_RETRIES = 3

if (!API_URL) {
    throw new Error('A URL da API não está definida nas variáveis de ambiente')
}

function removeNonNumeric(str: string): string {
    return str.replace(/\D/g, '')
}

//----------------------------------

const fetchWithToken = async <T>(endpoint: string, options: RequestInit = {}, retryCount = 0): Promise<T> => {
    const token = store.getState().auth.token
    const response = await fetch(`${API_URL}/${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })

    if (response.status === 401 && retryCount < MAX_RETRIES) {
        try {
            await refreshToken()
            return fetchWithToken(endpoint, options, retryCount + 1)
        } catch (error) {
            throw new Error('Falha ao renovar o token.')
        }
    }

    if (!response.ok) {
        throw new Error(`Erro ao buscar dados de ${endpoint}: ${response.statusText}`)
    }

    return response.json()
}

const deletehWithToken = async (endpoint: string, options: RequestInit = {}, retryCount = 0): Promise<void> => {
    const token = store.getState().auth.token
    const response = await fetch(`${API_URL}/${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })

    if (response.status === 401 && retryCount < MAX_RETRIES) {
        try {
            await refreshToken()
            return fetchWithToken(endpoint, options, retryCount + 1)
        } catch (error) {
            throw new Error('Falha ao renovar o token.')
        }
    }

    if (!response.ok) {
        throw new Error(`Erro ${endpoint}: ${response.statusText}`)
    }

    return
}

const refreshToken = async (): Promise<void> => {
    const newToken = await fetchNewToken()
    store.dispatch(setToken(newToken))
}

const fetchNewToken = async (): Promise<string> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ apiKey: 'nWLrhNbNlUrpC7UZy5H5atSq' }),
    })

    if (!response.ok) {
        throw new Error('Erro ao renovar token')
    }

    const data = await response.json()
    return data.access_token
}

//----------------------------------

const fetchData = async <T>(endpoint: string): Promise<T> => {
    return fetchWithToken<T>(endpoint)
}

const fetchDataURL = async <T>(url: string, options: RequestInit = {}, retryCount = 0): Promise<T> => {
    try {
        const token = store.getState().auth.token
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (response.status === 401 && retryCount < MAX_RETRIES) {
            try {
                await refreshToken()
                return fetchDataURL(url, options, retryCount + 1)
            } catch (error) {
                throw new Error('Falha ao renovar o token.')
            }
        }

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
        return deletehWithToken(`${endpoint}/${id}`, {
            method: 'DELETE',
        })
    } catch (error) {
        console.error(`Erro ao deletar dados ${endpoint}/${id}:`, error)
        throw error
    }
}

const patchData = async <T, R>(endpoint: string, id: string, data: T, options: RequestInit = {}, retryCount = 0): Promise<R> => {
    try {
        const token = store.getState().auth.token
        const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (response.status === 401 && retryCount < MAX_RETRIES) {
            try {
                await refreshToken()
                return patchData<T, R>(endpoint, id, data, options, retryCount + 1)
            } catch (error) {
                throw new Error('Falha ao renovar o token.')
            }
        }

        if (!response.ok) {
            throw new Error(`Erro ao atualziar dados ${endpoint}/${id}`)
        }

        return response.json()
    } catch (error) {
        console.error(`Erro ao atualziar dados ${endpoint}/${id}:`, error)
        throw error
    }
}

const postData = async <T, R>(endpoint: string, data: T, options: RequestInit = {}, retryCount = 0): Promise<R> => {
    try {
        const token = store.getState().auth.token
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (response.status === 401 && retryCount < MAX_RETRIES) {
            try {
                await refreshToken()
                return postData<T, R>(endpoint, data, options, retryCount + 1)
            } catch (error) {
                throw new Error('Falha ao renovar o token.')
            }
        }

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

//-----------------------------------

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
