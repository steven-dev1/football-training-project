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
                console.log('Estado: ' + state.favorites + ' favorite: ' + action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(id => id !== action.payload);
        },
        listFavorites: (state, action: PayloadAction<string[]>) => {
            state.favorites = action.payload;
            console.log(state.favorites)
        }
    },
});

export const { addFavorite, removeFavorite, listFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;