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
            window.localStorage.setItem('token', action.payload.token);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            window.localStorage.removeItem('token');
        },
        changeAvatar(state, action) {
            state.user.avatar = action.payload;
        },
        changeUser(state, action) {
            console.log(action.payload);
            state.user.firstname = action.payload.firstName;
            state.user.lastname = action.payload.lastName;
            state.user.username = action.payload.email;
        }
    },
});

export const { login, logout, changeAvatar, changeUser } = authSlice.actions;
export default authSlice.reducer;