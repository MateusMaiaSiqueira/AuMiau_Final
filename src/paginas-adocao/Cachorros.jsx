import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cachorros = () => {
  const [animais, setAnimais] = useState([]);
  const [cachorros, setCachorros] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/animais')
      .then(response => response.json())
      .then(data => setAnimais(data))
      .catch(error => console.error('Error fetching animals:', error));
  }, []);

  useEffect(() => {
    const filteredCachorros = animais.filter(animal => animal.tipo === 'cachorro');
    setCachorros(filteredCachorros);
  }, [animais]);

  return (
    <div className="container mx-auto">
      <h2 className="mt-8 mb-8 flex justify-center items-center text-3xl font-bold my-4">Cachorros</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cachorros.map(cachorro => (
          <div key={cachorro.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <img src={cachorro.foto} alt={cachorro.nome} className="h-48 w-48 mb-2" />
            <h3 className="text-lg font-semibold mb-2">{cachorro.nome}</h3>
            <p className="text-sm text-gray-600 mb-4">{cachorro.descricao}</p>
            <Link to={`/adotar/${cachorro.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Adotar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cachorros;
