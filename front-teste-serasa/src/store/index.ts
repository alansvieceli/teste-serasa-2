import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

const tabSlice = createSlice({
    name: 'tabs',
    initialState: 'dashboard', // Definindo 'dashboard' como a aba inicial
    reducers: {
        setActiveTab: (state, action: PayloadAction<string>) => action.payload,
    },
})

export const { setActiveTab } = tabSlice.actions

const store = configureStore({
    reducer: {
        tabs: tabSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector)

export default store
