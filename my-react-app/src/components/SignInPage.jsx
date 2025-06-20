import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, getUserProfile } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../css/main.css';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    try {
      // Appel API de connexion
      const response = await axios.post(`${API_URL}/user/login`, { email, password });
      const token = response.data.body.token;
      localStorage.setItem('token', token);

      // On setUser avec user vide temporaire (sera peuplé après)
      dispatch(setUser({ user: {}, token }));

      // On va chercher les infos du profil avec le token
      await dispatch(getUserProfile());

      navigate('/profile');
    } catch (error) {
      setErrorMsg("Email ou mot de passe incorrect.");
      // console.error('Erreur de connexion :', error);
    }
  };

  return (
    <>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.webp"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </a>
        </div>
      </nav>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {errorMsg && (
              <div style={{ color: 'red', marginBottom: '1rem' }}>
                {errorMsg}
              </div>
            )}
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default SignInPage;
