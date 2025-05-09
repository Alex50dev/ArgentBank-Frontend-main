import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';

import Index from './components/IndexPage';
import SignInPage from './components/SignInPage';
import UserPage from './components/UserPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/UserPage" element={<UserPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
