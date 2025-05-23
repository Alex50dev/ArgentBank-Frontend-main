import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Token sauvegardé au reload
const tokenFromStorage = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!tokenFromStorage,
  userInfo: null,
  error: null,
  token: tokenFromStorage || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, logOut, setError } = userSlice.actions;

// LOGIN (POST)
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/user/login',
      { email, password }
    );
    const token = response.data.body.token; // Swagger: token dans body.token
    localStorage.setItem('token', token);
    // On ne connaît pas encore l'utilisateur, donc user: {} pour l'instant
    dispatch(setUser({ user: {}, token }));
    await dispatch(getUserProfile()); // On récupère le profil juste après
  } catch (error) {
    dispatch(setError('Identifiants invalides ou erreur réseau'));
  }
};

// GET PROFILE
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    const token = getState().user.token || localStorage.getItem('token');
    if (!token) {
      dispatch(setError('Token manquant'));
      return;
    }
    const response = await axios.get(
      'http://localhost:3001/api/v1/user/profile',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch(setUser({ user: response.data.body, token }));
  } catch (error) {
    dispatch(setError('Erreur lors du chargement du profil'));
  }
};

// UPDATE PROFILE (pour changer le nom)
export const updateUserProfile = (userName) => async (dispatch, getState) => {
  try {
    const token = getState().user.token || localStorage.getItem('token');
    const response = await axios.put(
      'http://localhost:3001/api/v1/user/profile',
      { userName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(setUser({ user: response.data.body, token }));
  } catch (error) {
    dispatch(setError('Erreur lors de la modification du profil'));
  }
};

export default userSlice.reducer;
