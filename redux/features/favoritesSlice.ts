import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    favorites: string[];
}

const initialState: FavoritesState = {
    favorites: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
                console.log(action)
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(id => id !== action.payload);
        },
        initializeFavorites: (state, action: PayloadAction<string[]>) => {
            state.favorites = action.payload;
            console.log(state.favorites)
        }
    },
});

export const { addFavorite, removeFavorite, initializeFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;