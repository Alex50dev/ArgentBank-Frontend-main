import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, getUserProfile, updateUserProfile } from '../Redux/userSlice'; 
import '../../../css/main.css';

function UserPage() {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo, error } = useSelector((state) => state.user);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (isAuthenticated && !userInfo) {
      dispatch(getUserProfile());
    }
  }, [isAuthenticated, userInfo, dispatch]);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // On vérifie d'abord si userInfo existe et le nom à changer aussi
    if (userInfo && newName && newName !== (userInfo.userName || userInfo.name)) {
      dispatch(updateUserProfile(newName));
    }
  };

  if (!isAuthenticated) {
    return <p>You need to sign in to view this page.</p>;
  }

  if (!userInfo) {
    return <p>Chargement...</p>;
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
          <span className="main-nav-item">
            Hello, {userInfo ? (userInfo.userName || userInfo.name) : "Utilisateur"}
          </span>
          <button onClick={handleLogout} className="main-nav-item">
            <i className="fa fa-sign-out"></i> Sign Out
          </button>
        </div>
      </nav>

      <main className="main">
        <div className="header">
          <h1>
            Welcome back, {userInfo ? (userInfo.userName || userInfo.name) : ""}!
          </h1>
          <button
            className="edit-button"
            onClick={() => setNewName(userInfo ? (userInfo.userName || userInfo.name) : '')}
          >
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
                placeholder={userInfo ? (userInfo.userName || userInfo.name) : ""}
              />
            </div>
            <button type="submit" className="sign-in-button">Update Name</button>
          </form>
        </section>

        {/* Exemples de comptes */}
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
