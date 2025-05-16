import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  error: null,
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
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, logOut, setError } = userSlice.actions;

// Action pour se connecter
export const loginUser = (email, password) => async (dispatch) => {
  try {
    // Utilisation de l'URL correcte pour l'API /user/login
    const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
    dispatch(setUser(response.data.body)); // Met à jour le store avec les informations utilisateur
  } catch (error) {
    dispatch(setError(error.response ? error.response.data : 'Erreur de connexion'));
  }
};

// Action pour récupérer le profil utilisateur
export const getUserProfile = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Utilisation du token pour l'authentification
      },
    });
    dispatch(setUser(response.data.body)); // Met à jour les informations du profil
  } catch (error) {
    dispatch(setError(error.response ? error.response.data : 'Erreur de récupération du profil'));
  }
};

// Action pour mettre à jour le profil utilisateur
export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Utilisation du token pour l'authentification
      },
    });
    dispatch(setUser(response.data.body)); // Met à jour le profil dans le store
  } catch (error) {
    dispatch(setError(error.response ? error.response.data : 'Erreur de mise à jour du profil'));
  }
};

export default userSlice.reducer;
