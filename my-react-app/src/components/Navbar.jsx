import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../Redux/userSlice';
import '../../../css/main.css';

function Navbar() {
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
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
        {isAuthenticated && userInfo ? (
          <>
            <span className="main-nav-item">
              {userInfo.userName || userInfo.name}
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
  );
}

export default Navbar;
