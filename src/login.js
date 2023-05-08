import React, { useState } from 'react';
import { auth } from './firebase';
import { Redirect } from 'react-router-dom';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setErrorMessage('E-mail ou senha incorreto');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await auth.sendPasswordResetEmail(email);
      alert('E-mail de recuperação de senha enviado!');
      setIsPasswordReset(false);
    } catch (error) {
      setErrorMessage('Não foi possível enviar o e-mail de recuperação de senha. Verifique o endereço de e-mail informado.');
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/logado" />;
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {errorMessage && <p className="login-error">{errorMessage}</p>}
      {!isPasswordReset &&
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="login-label">E-mail:</label>
          <div className="imput">
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="login-input" />
          </div>
          <label htmlFor="password" className="login-label">Senha:</label>
          <div className="imput">
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="login-input" />
          </div>
          <div className="button-entrar">
            <button type="submit" className="login-button">Entrar</button>
          </div>
          <div className="button">
            <button type="button" onClick={() => setIsPasswordReset(true)} className="login-button">Recuperar Senha</button>
          </div>
        </form>
      }
      {isPasswordReset &&
        <form onSubmit={handlePasswordReset}>
          <label htmlFor="email" className="login-label">Digite seu e-mail para recuperar sua senha:</label>
          <div className="imput">
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="button">
            <button type="submit" className="login-button">Enviar E-mail de Recuperação de Senha</button>
          </div>
          <div className="button">
            <button type="button" onClick={() => setIsPasswordReset(false)} className="login-button">Voltar</button>
          </div>
        </form>
      }
    </div>
  );
}

export default Login;
