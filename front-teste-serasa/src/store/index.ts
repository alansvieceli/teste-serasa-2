import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { FarmerData } from 'src/services'

const tabSlice = createSlice({
    name: 'tabs',
    initialState: 'dashboard', // Definindo 'dashboard' como a aba inicial
    reducers: {
        setActiveTab: (state, action: PayloadAction<string>) => action.payload,
    },
})

const farmersSlice = createSlice({
    name: 'farmers',
    initialState: [] as FarmerData[],
    reducers: {
        setFarmersData: (state, action: PayloadAction<FarmerData[]>) => action.payload,
        removeFarmer: (state, action: PayloadAction<string>) => state.filter(farmer => farmer.id !== action.payload),
    },
})

export const { setActiveTab } = tabSlice.actions
export const { setFarmersData, removeFarmer } = farmersSlice.actions

const store = configureStore({
    reducer: {
        tabs: tabSlice.reducer,
        farmers: farmersSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector)

export default store
