import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.isAuthenticated = true;
        state.userInfo = action.payload;
      },
      logOut: (state) => {
        state.isAuthenticated = false;
        state.userInfo = null;
      },
    },
  });
  
  export const { setUser, logOut } = userSlice.actions;
  
  // ✅ La bonne ligne (on exporte le reducer SEUL)
  export default userSlice.reducer;