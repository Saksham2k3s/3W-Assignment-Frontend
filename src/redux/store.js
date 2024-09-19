import { configureStore } from '@reduxjs/toolkit'
import allUsersReducer from './slices/getAllUserSlice'
import addScoreReducer from './slices/addScoreSlice'
export const store = configureStore({
    reducer: {
       allUsers: allUsersReducer,
       addScore: addScoreReducer
    }
});

