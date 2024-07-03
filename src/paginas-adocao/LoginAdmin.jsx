import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../pagina-inicial/Logo';
import Footer from '../pagina-inicial/Footer';

const LoginAdmin = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmails = ['mateus.siqueira@univille.br', 'giordano.gava@univille.br'];
    const validPassword = '12345678';

    if (validEmails.includes(email) && password === validPassword) {
      setAuthenticated(true);
      navigate('/admin');
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded">
          <h2 className="text-3xl font-bold mb-4 text-center">Login Admin</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Senha:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                required 
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Login</button>
          </form>
        </div>
      </div>
     
    </div>
  );
};

export default LoginAdmin;
