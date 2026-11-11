// Точка входу застосунку React: підключає стилі SCSS з ПР3–ПР4 і монтує App у #root
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
