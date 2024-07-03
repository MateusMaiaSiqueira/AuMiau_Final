import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Admin = ({ authenticated }) => {
  const [animal, setAnimal] = useState({
    nome: '',
    idade: '',
    castrado: '',
    humor: '',
    tipo: '',
    vacinado: '',
    foto: '',
    descricao: ''
  });
  const [animais, setAnimais] = useState([]);
  const [filteredAnimais, setFilteredAnimais] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('todos');

  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/admin-login');
    } else {
      fetch('http://localhost:8080/animais')
        .then(response => response.json())
        .then(data => {
          setAnimais(data);
          setFilteredAnimais(data);
        })
        .catch(error => console.error('Error fetching animals:', error));

      fetch('http://localhost:8080/usuarios')
        .then(response => response.json())
        .then(data => setUsuarios(data))
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [authenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    if (selectedFilter === 'todos') {
      setFilteredAnimais(animais);
    } else {
      const filtered = animais.filter(animal => animal.tipo === selectedFilter);
      setFilteredAnimais(filtered);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const animalData = {
      nome: animal.nome,
      idade: animal.idade,
      castrado: animal.castrado === 'Sim',
      humor: animal.humor,
      tipo: animal.tipo,
      vacinado: animal.vacinado === 'Sim',
      foto: animal.foto,
      descricao: animal.descricao
    };

    const url = editing ? `http://localhost:8080/animais/${editing}` : 'http://localhost:8080/animais';
    const method = editing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalData),
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      console.log('Animal saved:', result);

      setEditing(null);
      setAnimal({
        nome: '',
        idade: '',
        castrado: '',
        humor: '',
        tipo: '',
        vacinado: '',
        foto: '',
        descricao: ''
      });

      const data = await fetch('http://localhost:8080/animais').then(response => response.json());
      setAnimais(data);
      setFilteredAnimais(data);
    } catch (error) {
      console.error('Error saving animal:', error);
      alert(`Error saving animal: ${error.message}`);
    }
  };

  const handleEdit = (id) => {
    const animalToEdit = animais.find(animal => animal.id === id);
    setAnimal({
      nome: animalToEdit.nome,
      idade: animalToEdit.idade,
      castrado: animalToEdit.castrado ? 'Sim' : 'Não',
      humor: animalToEdit.humor,
      tipo: animalToEdit.tipo,
      vacinado: animalToEdit.vacinado ? 'Sim' : 'Não',
      foto: animalToEdit.foto,
      descricao: animalToEdit.descricao
    });
    setEditing(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/animais/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await fetch('http://localhost:8080/animais').then(response => response.json());
      setAnimais(data);
      setFilteredAnimais(data);
    } catch (error) {
      console.error('Error deleting animal:', error);
      alert(`Error deleting animal: ${error.message}`);
    }
  };

  const getUserById = (id) => usuarios.find(usuario => usuario.id === id);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">{editing ? 'Atualizar Animal' : 'Adicionar Novo Animal'}</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={animal.nome}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="idade">Idade:</label>
          <input
            type="text"
            id="idade"
            name="idade"
            value={animal.idade}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="castrado">Castrado:</label>
          <select
            id="castrado"
            name="castrado"
            value={animal.castrado}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="humor">Humor:</label>
          <input
            type="text"
            id="humor"
            name="humor"
            value={animal.humor}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            name="tipo"
            value={animal.tipo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Selecione</option>
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="vacinado">Vacinado:</label>
          <select
            id="vacinado"
            name="vacinado"
            value={animal.vacinado}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="foto">Foto (URL):</label>
          <input
            type="text"
            id="foto"
            name="foto"
            value={animal.foto}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={animal.descricao}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editing ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>

      <h2 className="text-3xl font-bold mb-4 text-center mt-8">Animais</h2>

      <div className="mb-4 max-w-lg mx-auto">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="filter">Filtrar por:</label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="todos">Todos</option>
          <option value="cachorro">Cachorros</option>
          <option value="gato">Gatos</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnimais.map(animal => (
          <div key={animal.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={animal.foto} alt={animal.nome} className="h-48 w-48 mb-2 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-center">{animal.nome}</h3>
            <p className="text-sm text-gray-600 mb-4">{animal.descricao}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(animal.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Editar
              </button>
              <Link to={`/interessados/${animal.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center">
                Interessados
              </Link>
              <button
                onClick={() => handleDelete(animal.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

