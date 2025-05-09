import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice'; // Action Redux pour connecter l'utilisateur
import { useNavigate } from 'react-router-dom';
import '../../../css/main.css'; // Assure-toi d'importer le CSS associé

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Utilise useNavigate pour rediriger après connexion

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Simule l'appel API pour la connexion
    // Remplace cette logique par un appel API réel
    const userData = { name: username, email: 'user@example.com' };

    // Dispatch de l'action setUser pour ajouter l'utilisateur au store
    dispatch(setUser(userData));

    // Redirige vers la page d'accueil ou autre page
    navigate('/');
  };

  return (
    <>
      {/* Navbar */}
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

      {/* Main Sign-In Form */}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default SignInPage;
