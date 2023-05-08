import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { firestore} from "./firebase";

function ProcuraFirebase() {
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]); 
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleClick = () => {
    history.push("/Home");
  };

  const handleSubmit = (e) => {
    if (value.length > 0) {
        e.preventDefault();
        firestore.collection('values').add({ value });
        setValue('');
    }
};
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonClicked(true);

    const querySnapshot = await firestore
      .collection('values')
      .where('value', '==', searchValue)
      .get();

    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    setSearchResult(results);
    setIsLoading(false);
  };
  const showTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <table>
            {searchResult.map((result) => (
              <tr key={result.id}>
                <td className="id">{result.id}</td>
                <td className="value">{result.value}</td>
              </tr>
            ))}</table>
        </tbody>
      </table>
    );
  }

  return (

    <div className="Procura">
      <div>
        <h1>Adicionar dados</h1>
          <form onSubmit={handleSubmit}>
            <div className="imput">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>                    
            <div className="button">
                <button type="submit">Adicionar</button>
            </div>
          </form>
            </div>   
      <h1>Procurar dados no firebase</h1>
      <form onSubmit={handleSearch}>
        <div className="imput">
          <input className="input"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          /></div>

        <div className="button">
          <button type="submit" disabled={isLoading}>
            Buscar
          </button>

        </div>
      </form>

      {isLoading && <div className="loading">Carregando...</div>}

      {isButtonClicked && !isLoading && searchValue && searchResult.length === 0 && (
        <p>Valor não encontrado</p>
      )}

      {!isLoading && searchResult.length > 0 && showTable()}
      <div className="Voltar">
        <button onClick={handleClick}>Voltar</button>
      </div>
    </div>
  );
}

export default ProcuraFirebase;
