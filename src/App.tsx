import React from 'react';
import './App.css';
import './css/style.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoApp from './imagens/bitcoin.png';

class App extends React.Component<{nome : string}>  {


  RemoveLogged = () =>{
    localStorage.removeItem('cliente');
    window.location.reload();
  }

  render(){
    return (
      <div>                        
        <Navbar className="divisor-bottom bg-light">
         
            <div>
              <img src={logoApp} width="40" height="40" alt=""/>
            </div>
            
            <div>WebApp Desafio</div>
            <div>Olá {this.props.nome} !</div>  

            <div>
            <Link to="/" onClick={this.RemoveLogged} className="nav-link">Sair</Link>      
            </div>         
        
        </Navbar>                         
       
          {this.props.children}
          
      </div>
    );
  }
}

export default App;
