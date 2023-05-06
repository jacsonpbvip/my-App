import React, { useState } from 'react';
import { firestore } from './firebase';

function Home() {
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
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
    return (
        <div>
            <h1>Adicionar</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                <button type="submit">Adicionar</button>
            </form>

            <br></br>

            <h1>Procurar</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button type="submit">Buscar</button>
                <ul>
                    {searchResult.length > 0 && searchValue != null ? (
                        <p>Valor encontrado: {searchResult[0].value}</p>
                    ) : (
                        <p>Valor não encontrado</p>
                    )}
                </ul>
            </form>
        </div>
    );
}

export default Home;
