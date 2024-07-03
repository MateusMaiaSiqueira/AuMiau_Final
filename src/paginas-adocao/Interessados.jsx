// src/paginas-adocao/Interessados.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Interessados = () => {
  const { id } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const allInteressados = JSON.parse(localStorage.getItem('interessados')) || [];
    const interessadosDoAnimal = allInteressados.filter(interessado => interessado.animalId === id);
    setUsuarios(interessadosDoAnimal);

    // Log para depuração
    console.log('Interessados do animal:', interessadosDoAnimal);
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (usuarios.length === 0) {
    return <p>Nenhum interessado encontrado.</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Interessados no Animal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuarios.map((usuario, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2 text-center">{usuario.nome}</h3>
            <p className="text-sm text-gray-600 mb-2"><strong>Email:</strong> {usuario.email}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Telefone:</strong> {usuario.telefone}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Bairro:</strong> {usuario.bairro}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Cidade:</strong> {usuario.cidade}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Rua:</strong> {usuario.rua}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Tipo de Residência:</strong> {usuario.tipoResidencia}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Idade:</strong> {usuario.idade}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Número da Residência:</strong> {usuario.numeroResidencia}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Ponto de Referência:</strong> {usuario.pontoReferencia}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Interessados;

