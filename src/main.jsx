import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/paleta.css';
import './style/layout.css';
import './style/componentes.css';
import './style/formularios.css';
import './style/tablas.css';
import App from './App.jsx';
import DatosProvider from './context/DatosProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DatosProvider>
        <App />
      </DatosProvider>
    </BrowserRouter>
  </StrictMode>
)
