import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../Redux/userSlice';
import '../../../css/main.css';

function IndexPage() {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logOut());
  };

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
          {/* Affichage conditionnel selon l'état de connexion */}
          {isAuthenticated && userInfo && (userInfo.userName || userInfo.name) ? (
            <>
              <span className="main-nav-item">
                Hello, {userInfo.userName || userInfo.name}
              </span>
              <button onClick={handleLogout} className="main-nav-item">
                <i className="fa fa-sign-out"></i> Sign Out
              </button>
            </>
          ) : (
            <a className="main-nav-item" href="/sign-in">
              <i className="fa fa-user-circle"></i> Sign In
            </a>
          )}
        </div>
      </nav>

      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <section className="features">
          <div className="feature-item">
            <img src="./img/icon-chat.webp" alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </div>
          <div className="feature-item">
            <img src="./img/icon-money.webp" alt="Money Icon" className="feature-icon" />
            <h3 className="feature-item-title">More savings means higher rates</h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </div>
          <div className="feature-item">
            <img src="./img/icon-security.webp" alt="Security Icon" className="feature-icon" />
            <h3 className="feature-item-title">Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money
              is always safe.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default IndexPage;
