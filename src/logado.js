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
    
    const handleClick = () => {
        history.push("/Home");
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
        <div className="logado">
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
            <div className="Voltar">
          <button onClick={handleClick}>Voltar</button>
        </div>
    </div>   
        
    );
}

export default Home;

