import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import numberToWords from 'number-to-words';
import "./App.css";

function Desafio() {
    const [number, setNumber] = useState('');
    const history = useHistory();
    
    const handleClick = () => {
      history.push("/Home");
    };
    const handleInputChange = (event) => {
      setNumber(event.target.value);
  };

  return (
    <div className="Desafio">
      <h1>Digite um numero</h1>
      <div className="imput">
        <input type="number" value={number} onChange={handleInputChange} />
      </div>
      {number && <p>{numberToWords.toWords(number)}</p>}
      <div className="Voltar">
          <button onClick={handleClick}>Voltar</button>
        </div>
    </div>
    
  );
}

export default Desafio;
