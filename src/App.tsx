import React, { Component } from 'react';
import './App.css';
import './css/blog.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import logoApp from './imagens/bitcoin.png';

class App extends Component  {

  RemoveLogged = () =>{
    localStorage.removeItem('cliente');
    window.location.reload();
  }

  render(){
    return (
  
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light border-divisor-bottom">
          
          <div className="margin-right-nav">
            <img src={logoApp} width="60" height="60" alt=""/>
          </div>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/" onClick={this.RemoveLogged} className="nav-link">Sair</Link></li>          
          </ul>        
        </nav>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default App;
