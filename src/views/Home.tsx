import React, { Component } from 'react';
import { Header } from './Header';
import { SaldoView } from './SaldoView';
import { Operacao } from './Operacao';
import GridBox from './Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import { Mensagem } from './Mensagem';

export default class Home extends Component{
    
 
    
    render() {
        return (
            <div className="painel">
                <div className="col-md-2">
                 <SaldoView/>   
                </div>
                <div className="col-md-10">                          
 
                    <Row>
                        <div className="col-md-4">
                            <Header titulo="Movimentação"></Header>
                        </div>
                        <div className=""></div>
                        <div className="col-md-8">
                            <Header titulo="Extrato"></Header>
                        </div>                   
                    </Row>
                    
                    <Row>
                        <div className="col-md-4">
                            <Operacao/>                        
                            <Mensagem/>          
                        </div>  
                    
                        <div className="col-md-7">                       
                            <GridBox/>                     
                        </div>

                           
                    </Row>
               
             
                </div>
            </div>                 
        )
    }

}