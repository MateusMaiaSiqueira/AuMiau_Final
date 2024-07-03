import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pagina-inicial/Home';
import Cachorros from './paginas-adocao/Cachorros';
import Gatos from './paginas-adocao/Gatos';
import Adotar from './paginas-adocao/Adotar';
import Admin from './paginas-adocao/Admin';
import LoginAdmin from './paginas-adocao/LoginAdmin';
import Doacoes from './paginas-adocao/Doacoes';
import Interessados from './paginas-adocao/Interessados';
import Logo from './pagina-inicial/Logo';
import Footer from './pagina-inicial/Footer';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Logo />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cachorros" element={<Cachorros />} />
            <Route path="/gatos" element={<Gatos />} />
            <Route path="/adotar/:id" element={<Adotar />} />
            <Route path="/admin" element={<Admin authenticated={authenticated} />} />
            <Route path="/admin-login" element={<LoginAdmin setAuthenticated={setAuthenticated} />} />
            <Route path="/doacoes" element={<Doacoes />} />
            <Route path="/interessados/:id" element={<Interessados />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;