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
        if (searchValue.length > 0) {
            e.preventDefault();
            const querySnapshot = await firestore.collection('values').where('value', '==', searchValue).get();
            const result = [];
            querySnapshot.forEach((doc) => {
                result.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setSearchResult(result);
            setSearchValue('');
        }
    };

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
        <div className="login-container">
            <div>
                <h1>Adicionar dados</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    <br></br>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
            <br></br>
            <div>
                <h1>Procurar dados no firebase</h1>
                <form onSubmit={handleSearch}>
                    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <br></br>
                    <button type="submit">Buscar</button>
                    <br></br>
                    <ul>
                        {searchResult.length > 0 && searchValue != null ? (
                            <p>Valor encontrado: {searchResult[0].value}</p>
                        ) : (
                            <p></p>
                        )}
                    </ul>
                </form>
            </div>
            <br></br>
            <div>
                <h1>Digite um numbero</h1>
                <input type="number" value={number} onChange={handleInputChange} />
                <br />
                {number && <p>{numberToWords.toWords(number)}</p>}
            </div>
            <br></br>
            <div>
                <h1>Criar novo login</h1>
                <form onSubmit={handleSignUp}>
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Nome" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                    <br></br>
                    <button type="submit">Criar Conta</button>
                </form>

                {signUpError && <p>Erro ao criar conta: {signUpError.message}</p>}
            </div>
            <br></br>
            <div>
                <button onClick={handleLogout}>Deslogar</button>
            </div>
        </div>
    );
}

export default Home ;

