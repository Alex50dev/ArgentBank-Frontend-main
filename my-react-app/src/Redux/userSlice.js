import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Utilise la variable d'environnement pour l'URL de l'API
const API_URL = import.meta.env.VITE_API_URL;

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
      `${API_URL}/user/login`,
      { email, password }
    );
    const token = response.data.body.token;
    localStorage.setItem('token', token);
    dispatch(setUser({ user: {}, token }));
    dispatch(getUserProfile());
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
      `${API_URL}/user/profile`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch(setUser({ user: response.data.body, token }));
  } catch (error) {
    dispatch(setError('Erreur lors du chargement du profil'));
  }
};

// UPDATE PROFILE
export const updateUserProfile = (userName) => async (dispatch, getState) => {
  try {
    const token = getState().user.token || localStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/user/profile`,
      { userName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(setUser({ user: response.data.body, token }));
  } catch (error) {
    dispatch(setError('Erreur lors de la modification du profil'));
  }
};

export default userSlice.reducer;
