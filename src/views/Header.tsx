import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/blog.css'
export class Header extends Component<{titulo : string}>{
    

    render() {
        return <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-2 pt-1">            
          </div>
          <div className="col-8 text-center">
            <a className="blog-header-logo text-oranged" href="#">{this.props.titulo}</a>
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
          </div>
        </div>   
      </header>
        
    }

}