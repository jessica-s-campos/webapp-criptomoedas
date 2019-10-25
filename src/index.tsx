import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router, Route} from 'react-router';
import {createBrowserHistory} from 'history';
import Clientes from './views/Clientes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home';
import {DBConfig} from './Database';
import { initDB } from 'react-indexed-db';

initDB(DBConfig);

const customHistory = createBrowserHistory();

ReactDOM.render((<Router history={customHistory}>
    <div className="margin-root">
        <App>    
            <Home>           
                <Route path="/clientes" component={Clientes}/>        
            </Home>
        </App>
    </div>
</Router>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
