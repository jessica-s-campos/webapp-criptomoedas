import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router} from 'react-router';
import {createBrowserHistory} from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DBConfig} from './Database';
import { initDB } from 'react-indexed-db';
import LoginBox from './views/Login';
import Home from './views/Home';
import Cliente from './models/Cliente';

initDB(DBConfig);

const customHistory = createBrowserHistory();

var nome_cliente_logado : string = "";

PubSub.subscribe('login-autorizado',(topis: any, cliente : Cliente) => {              
    localStorage.setItem('cliente', JSON.stringify({ 'id': cliente.id, 'nome': cliente.nome})); 
    window.location.reload();
});

if(!localStorage.getItem('cliente')){
    ReactDOM.render((<Router history={customHistory}>
        <div>     
            <LoginBox/>                    
        </div>
    </Router>), document.getElementById('root'));
}else{
    nome_cliente_logado = JSON.parse(localStorage.getItem('cliente') || '{}').nome;;   

    ReactDOM.render((<Router history={customHistory}>                                         
       <App nome={nome_cliente_logado}> 
           <Home/>
       </App>                  
    </Router>), document.getElementById('root'));
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
