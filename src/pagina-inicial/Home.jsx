// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import cachorroImg from '../assets/cachorro.png';
import gatoImg from '../assets/gato.png';
import doacaoImg from '../assets/doacao.png';



const response = fetch('http://localhost:8080/usuarios')
console.log(response)


const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">Escolha uma opção:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/cachorros" className="text-center bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <img src={cachorroImg} alt="Cachorro" className=" mb-2" />
          <span className="text-lg font-semibold text-blue-600 hover:underline">Cachorro</span>
        </Link>
        <Link to="/gatos" className="text-center bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <img src={gatoImg} alt="Gato" className="h-72 w-72 mb-2" />
          <span className="text-lg font-semibold text-blue-600 hover:underline">Gato</span>
        </Link>
        <Link to="/doacoes" className="text-center bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <img src={doacaoImg} alt="Doações" className="h-72 w-72 mb-2" />
          <span className="text-lg font-semibold text-blue-600 hover:underline">Doações</span>
        </Link>
      </div>
      
    </div>
  );
}


export default Home;
