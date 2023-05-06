import React, { useState } from 'react';
import { auth } from './firebase';
import { Redirect } from 'react-router-dom';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setErrorMessage('Nome do usuário ou senha incorreto');
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/logado" />;
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {errorMessage && <p className="login-error">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="email" className="login-label">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <label htmlFor="password" className="login-label">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
