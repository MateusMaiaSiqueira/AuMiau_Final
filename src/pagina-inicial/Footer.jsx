//Footer.jsx
import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className='text-white'>
          <p className='ml-5'>Endereço: Rua dos Girassóis 47</p>
          <p className='ml-5'>Telefone: (47) 99972-1421</p>
        </div>
        <p className='text-white mr-5'>Horário de Atendimento: Seg-Sex 9:00 - 17:00</p>
      </div>
    </footer>
  );
}


export default Footer;
