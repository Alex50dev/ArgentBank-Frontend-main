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
    updateUserName: (state, action) => {
      if (state.userInfo) {
        state.userInfo.name = action.payload;
      }
    },
  },
});

export const { setUser, logOut, updateUserName } = userSlice.actions;
export default userSlice.reducer;
