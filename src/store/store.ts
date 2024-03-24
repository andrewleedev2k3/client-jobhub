import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import userReducer from './userSlice';
import uiReducer from './uiSlice';
import { apiSlice } from '../services/apiSlice';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        user: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
