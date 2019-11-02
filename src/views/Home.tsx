import React, { Component } from 'react';
import { Header } from './Header';
import { SaldoView } from './SaldoView';
import { Operacao } from './Operacao';
import GridBox from './Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Mensagem } from './Mensagem';

export default class Home extends Component{
    
 
    
    render() {
        return (
            <div>
            
              
                <Header titulo="WebApp Desafio"></Header>
             
   
                <SaldoView/>   
            
                
                <Row>
                    <div className="col-md-6">
                        <Header titulo="Movimentações"></Header>
                    </div>
                    <div className="col-md-6">
                        <Header titulo="Extrato"></Header>
                    </div>                   
                </Row>
                
                <Row>
                    <div className="col-md-6 border-divisor-split">
                        <Operacao/>
                        
                        <Mensagem/>
                    
                    </div>  

                    <div className="col-md-6">
                        <GridBox/>
                    </div>
                </Row>
             
            </div>
      
           
        )
    }

}