import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/paleta.css';
import './style/layout.css';
import './style/componentes.css';
import './style/formularios.css';
import './style/tablas.css';
import './style/Landing.css';
import App from './App.jsx';
import AuthProvider from './context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);