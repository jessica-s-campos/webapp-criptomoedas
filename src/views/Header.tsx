import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'
export class Header extends Component<{titulo : string}>{
    

    render() {
        return <header className="py-3">
        <div className="row flex-nowrap justify-content-between">
          <div className="col-2 pt-1">            
          </div>
          <div className="col-8">
            <p className="cabecalho-titulo">{this.props.titulo}</p>
          </div>
          <div className="col-2 d-flex justify-content-end">
          </div>
        </div>   
      </header>
        
    }

}