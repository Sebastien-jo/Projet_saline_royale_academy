import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';

const initialState = {
    auth: {
        isAuthenticated: false,
        user: null,
        token: null,
    },
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: initialState,
});
export default store;



