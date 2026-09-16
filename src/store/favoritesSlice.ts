import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type FavoriteItem = {
  id: number;
  type: "movie" | "tv";
  title: string;
  image: string;
};

type FavoritesState = {
  items: FavoriteItem[];
};

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteItem>) {
      const alreadyExists = state.items.some(
        (item) => item.id === action.payload.id && item.type === action.payload.type,
      );

      if (!alreadyExists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<{ id: number; type: "movie" | "tv" }>) {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.type === action.payload.type),
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
