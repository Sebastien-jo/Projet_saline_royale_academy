import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;