import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from './features/favoritesSlice'

export const store = () => {
    return configureStore({
        reducer: {
            favoriteStates: favoritesReducer
        }
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']