import { combineReducers } from "redux";
import { FavoriteReducer } from "./ListReducer";
import { configureStore  } from "@reduxjs/toolkit";


const reducers = combineReducers({
    favorites: FavoriteReducer,
})

const initialState = {
    favorites: {
        allFavorites: [],
    }
}

export const WatchWeb = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });