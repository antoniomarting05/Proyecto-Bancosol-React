import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';

function App() {

  return (
    <BrowserRouter>
      
      <Navbar />

      <div className="page-content" style={{ padding: '20px' }}>
        <Routes>
          {/* Ruta temporal para comprobar que funciona */}
          <Route path="/" element={<h1>Proyecto Bancosol - Bienvenido!</h1>} />
          <Route path="/tiendas" element={<h1>Tiendas</h1>} />
        </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App
