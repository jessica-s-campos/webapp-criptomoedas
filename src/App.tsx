import React, { Component } from 'react';
import './App.css';
import './css/blog.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoApp from './imagens/bitcoin.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component  {

  RemoveLogged = () =>{
    localStorage.removeItem('cliente');
    window.location.reload();
  }

  render(){
    return (
      <div>                        
        <Navbar className="border-divisor-bottom bg-light">
         
            <div className="margin-right-nav">
              <img src={logoApp} width="40" height="40" alt=""/>
            </div>

            <ul className="navbar-nav mr-auto">
              <li className="nav-item active"><Link to="/" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link to="/" onClick={this.RemoveLogged} className="nav-link">Sair</Link></li>          
            </ul>        
          
        </Navbar>                         
        <Container>
          {this.props.children}
        </Container>        
      </div>
    );
  }
}

export default App;
