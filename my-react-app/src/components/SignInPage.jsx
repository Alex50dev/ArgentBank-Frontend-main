import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice';  // Action Redux pour connecter l'utilisateur
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Ajoute l'importation d'axios
import '../../../css/main.css'; // Assure-toi d'importer le CSS associé

function SignInPage() {
  const [email, setEmail] = useState('');  // Utilisation de l'email de l'utilisateur
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Utilise useNavigate pour rediriger après connexion

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = {
      email: email,
      password: password,
    };

    try {
      // Effectuer l'appel API pour la connexion
      const response = await axios.post('http://localhost:3001/api/v1/user/login', userData);
      dispatch(setUser(response.data.body));  // Met à jour le store avec les informations utilisateur

      // Stockage du token dans le localStorage pour l'utiliser dans les requêtes suivantes
      localStorage.setItem('token', response.data.token);

      // Redirection vers la page de profil après la connexion réussie
      navigate('/profile');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      // Gérer l'erreur, par exemple afficher un message à l'utilisateur
    }
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
