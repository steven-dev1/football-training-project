import { Match } from "@/types/GameData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
    favorites: Match[]; // Define que el estado será una lista de partidos
  }
  
  const initialState: FavoritesState = {
    favorites: [],
  };

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Match>) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((match: Match) => match.matchInfo.id !== action.payload);
        },
    },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer