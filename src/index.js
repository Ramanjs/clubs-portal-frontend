import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Login from './pages/Login'
import Clubs from './pages/Clubs'
import Club from './pages/Club'
import LoginSuccess from './pages/LoginSuccess'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/login/success' element={<LoginSuccess />} />
          <Route path='/clubs' element={<Clubs />} />
          <Route path='/clubs/:handle' element={<Club />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
