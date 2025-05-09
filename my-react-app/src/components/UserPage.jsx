import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, updateUserName } from '../Redux/userSlice';  // Importer l'action updateUserName
import '../../../css/main.css';

function UserPage() {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.user);
  const [newName, setNewName] = useState(userInfo ? userInfo.name : '');  // Initialiser avec le nom actuel

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    dispatch(logOut());
  };

  // Fonction pour mettre à jour le nom de l'utilisateur
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName && newName !== userInfo.name) {
      dispatch(updateUserName(newName));  // Met à jour le nom dans Redux
    }
  };

  if (!isAuthenticated) {
    return <p>You need to sign in to view this page.</p>;
  }

  return (
    <div>
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
          <span className="main-nav-item">Hello, {userInfo.name}</span>
          <button onClick={handleLogout} className="main-nav-item">
            <i className="fa fa-sign-out"></i> Sign Out
          </button>
        </div>
      </nav>

      <main className="main">
        <div className="header">
          <h1>Welcome back, {userInfo.name}!</h1>
          <button className="edit-button" onClick={() => setNewName(userInfo.name)}>
            Edit Name
          </button>
        </div>

        {/* Formulaire pour modifier le nom */}
        <section className="account">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="new-name">New Name</label>
              <input
                type="text"
                id="new-name"
                value={newName}
                onChange={handleNameChange}
              />
            </div>
            <button type="submit" className="sign-in-button">Update Name</button>
          </form>
        </section>

        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default UserPage;
