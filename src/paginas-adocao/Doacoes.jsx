import React from 'react';
import qrcodeImg from '../assets/qrcode.png';

const Doacoes = () => {
  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Doações</h2>
      <img src={qrcodeImg} alt="QR Code para Doações" className="mb-4 w-48 h-48"/>
      <p className="text-lg font-semibold text-center mb-4">Chave PIX: (47) 99972-1421</p>
      <p className="text-lg text-center">
        Sua doação pode mudar a vida de um animal. 
      </p>
      <p>
      Contribua e ajude-nos a proporcionar um lar amoroso para os nossos amigos de quatro patas.
      </p>
    </div>
  );
}

export default Doacoes;

