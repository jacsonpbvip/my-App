import React, { useState } from "react";
import { firestore, auth } from "./firebase";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import numberToWords from 'number-to-words';
import { useHistory } from 'react-router-dom';

function Home() {
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [signUpError, setSignUpError] = useState(null);
    const [number, setNumber] = useState('');
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);



    const handleLogout = () => {
        auth.signOut();
        history.push('/login');
    };
    const handleInputChange = (event) => {
        setNumber(event.target.value);
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
                        <th>    ID    </th>
                        <th>    Value    </th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult.map((result) => (
                        <tr key={result.id}>
                            <td>{result.id}</td>
                            <td>{result.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }



    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({ displayName });
            setEmail('');
            setPassword('');
            setDisplayName('');
            setSignUpError(null);
        } catch (error) {

        }
    };

    return (
        <div className="logado">
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
            <div className="procurar-firebase">
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
            </div>
            <div className="digitar-numero">
                <h1>Digite um numero</h1>
                <div className="imput">
                    <input type="number" value={number} onChange={handleInputChange} />
                </div>
                {number && <p>{numberToWords.toWords(number)}</p>}
            </div>
            <br></br>
            <div className="criar-login">
                <h1>Criar novo login</h1>
                <form onSubmit={handleSignUp}>
                    <div className="imput">
                        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Nome" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                    </div>
                    <br></br>
                    <div className="button">
                        <button type="submit">Criar Conta</button>
                    </div>
                </form>

                {signUpError && <p>Erro ao criar conta: {signUpError.message}</p>}
            </div>

            <div className="button">
                <button onClick={handleLogout}>Deslogar</button>
            </div>
        </div>
    );
}

export default Home;

