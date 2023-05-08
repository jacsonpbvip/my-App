import "semantic-ui-css/semantic.min.css";
import "./App.css";
import {  auth } from "./firebase";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();
  
    const menuItems = [
      { name: 'Firebase', path: '/Procura' },
      { name: 'Adicionar novo login', path: '/logado' },
      { name: 'Desafio', path: '/Desafio' },
    ];
  
    const handleLogout = () => {
      auth.signOut();
      history.push('/login');
    };
  
    return (
      <div className="Home">
        
          {menuItems.map((item) => (
            <tr key={item.path}>
              <button className="menu-button" onClick={() => history.push(item.path)}>
                {item.name}
              </button>
            </tr>
          ))}
       
        <div className="button">
          <button onClick={handleLogout}>Deslogar</button>
        </div>
      </div>
    );
  }
  
export default Home;