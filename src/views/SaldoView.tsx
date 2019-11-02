import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../css/blog.css'
import PubSub from 'pubsub-js'; 
import { useIndexedDB } from 'react-indexed-db';
import Saldo from '../models/Saldo';
import Cliente from '../models/Cliente';

interface IState{
    saldo_bitcoin : number,
    saldo_brita : number,
    saldo_dinheiro : number
}

export class SaldoView extends React.Component<any, IState>{    
  
    constructor(props: any){
        super(props);
        this.state = { saldo_bitcoin : 0, saldo_brita : 0, saldo_dinheiro : 0};
    }
   
    componentDidMount(){   
               
        PubSub.subscribe('saldo-atualizado', (topico:any, id:any) => {       
            useIndexedDB('saldo').getByID(id).then((saldo : Saldo) => {
                this.setState({saldo_bitcoin : saldo.bitcoins, saldo_brita : saldo.britas, saldo_dinheiro : saldo.dinheiro});
            });  
        });    
    }

    render() {
        return <div  className="blog-header">           
            <div className="margin-saldo">           
                <Row className="txt-center">
                    <Col md="4">
                        <label className="blog-header-logo">Dinheiro Disponível</label>                
                    </Col>

                    <Col md="4">            
                        <label className="blog-header-logo">Bitcoins</label>                
                    </Col>
                    
                    <Col md="4">           
                        <label className="blog-header-logo">Britas</label>                         
                    </Col>
                    
                </Row>

                <Row className="txt-center">
                    <Col md="4">               
                        <label className="blog-header-logo" id="saldo-dinheiro">100.000,00</label>
                    </Col>

                    <Col md="4">                       
                        <label className="blog-header-logo" id="saldo-bitcoins">0,123456</label>       
                    </Col>
                    
                    <Col md="4">           
                        <label className="blog-header-logo" id="saldo-britas">0,123456</label>               
                    </Col>
            
                </Row>
            </div>
        </div>
            
    }

}