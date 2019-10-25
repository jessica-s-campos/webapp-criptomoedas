import React, { Component } from 'react';
import { Header } from './Header';
import { Saldo } from './Saldo';
import { Operacao } from './Operacao';
import GridBox from './Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

export default class Home extends Component{
    
 
    
    render() {
        return (
            <Container>
                <div>
                    <Header titulo="WebApp Desafio"></Header>
                </div>
                <div>
                    <Saldo/>   
                </div>
                <Row>
                    <div className="col-md-6">
                        <Header titulo="Movimentações"></Header>
                    </div>
                    <div className="col-md-6">
                        <Header titulo="Extrato"></Header>
                    </div>
                </Row>
                <Row>
                    <div className="col-md-6">
                            <Operacao/>
                    </div>
                    <div className="col-md-6">
                        <GridBox/>
                    </div>
                </Row>
            </Container>

        )
    }

}