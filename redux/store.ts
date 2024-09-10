import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from './features/favoritesSlice'

export const store = configureStore({
    reducer: {
        favoriteStates: favoritesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch