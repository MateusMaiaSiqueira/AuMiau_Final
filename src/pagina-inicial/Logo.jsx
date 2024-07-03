import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo-aumiau.png';


const Logo = () => {
  return (
    <div className="flex justify-between items-center h-20 bg-black">
      <Link to="/" className="ml-4">
        <button className="text-white text-sm mr-4">Home</button>
      </Link>
      <div className="w-40"> {/* Defina a largura desejada aqui */}
        <img src={logoImg} alt="logo" className='w-full h-full'/>
      </div>
      <div className="mr-4"></div> {/* Espaço vazio para manter o título centralizado */}
    </div>
  );
}


export default Logo;