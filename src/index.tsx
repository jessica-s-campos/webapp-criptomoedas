import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router, Route} from 'react-router';
import {createBrowserHistory} from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home';
import {DBConfig} from './Database';
import { initDB } from 'react-indexed-db';
import LoginBox from './views/Login';
import Cliente from './models/Cliente';
import { Mensagem } from './views/Mensagem';

import Row from 'react-bootstrap/Row';

initDB(DBConfig);

const customHistory = createBrowserHistory();

/*ReactDOM.render((<Router history={customHistory}>
    <div className="margin-root">
       
    </div>
</Router>), document.getElementById('root'));*/

PubSub.subscribe('login-autorizado',(topis: any, user_id : string) => {            
    localStorage.setItem('cliente', user_id); 
    window.location.reload();
});

if(!localStorage.getItem('cliente')){
    ReactDOM.render((<Router history={customHistory}>
        <div>
     
                <LoginBox/> 
                   
        </div>
    </Router>), document.getElementById('root'));
}else{
    ReactDOM.render((<Router history={customHistory}>       
       
        <div className="container-b">           
           <div className="box-b-home">
                <App>    
                    <Home>           
                        
                    </Home>
                </App>

            </div>
        </div>
        
    </Router>), document.getElementById('root'));
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
