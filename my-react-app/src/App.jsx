import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Redux/store';

import Index from './components/IndexPage';
import SignInPage from './components/SignInPage';
import UserPage from './components/UserPage';
import { getUserProfile } from './Redux/userSlice';

function AppContent() {
  const dispatch = useDispatch();
  const { token, userInfo, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Si on a un token mais pas encore de userInfo, on récupère le profil
    if (token && !userInfo && isAuthenticated) {
      dispatch(getUserProfile());
    }
  }, [dispatch, token, userInfo, isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/profile" element={<UserPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
