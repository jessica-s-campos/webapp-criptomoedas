import React, { Component } from 'react'; 
import Select from 'react-select'; 
import { Criptomoedas, Operacoes } from '../models/Tipos';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Movimentacao from '../models/Movimentacao';
import PubSub from 'pubsub-js'
import { AccessDB,useIndexedDB } from 'react-indexed-db';
import CriptoMoeda from "../models/CriptoMoeda";
import { Bitcoin } from '../models/Bitcoin';
import { Brita } from '../models/Brita';

import { Cliente } from '../models/Cliente';

export interface State{  
    operacao : Operacoes;
    criptomoeda1: CriptoMoeda;
    criptomoeda2: CriptoMoeda;
    valor : number;
    data : Date;
}

export class Operacao extends React.Component<{}, State>{
    constructor(props: any) {
        super(props);
        this.state = { operacao: Operacoes.Comprar, criptomoeda1 : new Bitcoin(), criptomoeda2 : new Brita(), valor : 0, data : new Date()};
      }   
      
      
    Adiciona = () => {  
        
        var mov = new Movimentacao(this.state.operacao, this.state.valor, this.state.criptomoeda1, this.state.criptomoeda2)               
        mov.RealizaMovimentacao(new Cliente(0,'Jéssica'))
    }
    
    setOperacao(o : any){ 
        o.persist();          
        if(o == Operacoes.Trocar){
            //exibir as duas caixas de criptomoedas col-md-6
        }else{
            //exibir apenas uma caixa de criptomoeda col-md-12
        }
        this.setState({operacao : o.target.value}); 
    }

    setCriptomoeda1(o : any ){  
        o.persist();  
        console.log('criptomoeda1:'+o.target.value)
        this.setState({criptomoeda1 : o.target.value})             
    }

    setCriptomoeda2(o : any){  
        o.persist();    
        console.log('criptomoeda2:'+o.target.value)
        this.setState({criptomoeda2 : o.target.value})           
    }

    setValor(o : any){ 
        o.persist();
        if(o == 0){
            alert('Valor não pode ser 0')
        }  
        else if(o < 0){
            alert('Valor não pode ser negativo')
             
        } else{
            this.setState({valor : o.target.value}); 
        }             
    }

    render() {
        
        return (<Container>
            
            <Form>
            <Row>
            
            <Col md="12">
                <Form.Label>Operação</Form.Label>
                <FormControl as="select" id="operacao" value={this.state.operacao} onChange={this.setOperacao.bind(this)}>
                    <option value={Operacoes.Comprar}>{Operacoes.Comprar}</option>
                    <option value={Operacoes.Vender} >{Operacoes.Vender}</option>
                    <option value={Operacoes.Trocar} >{Operacoes.Trocar}</option>         
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Col>

            <Col md="12">
            <Form.Label>Valor</Form.Label>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="input" onChange={this.setValor.bind(this)}/>
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
            </InputGroup>
            </Col>
          
            <Col md="6">
                <Form.Label>CriptoMoeda1</Form.Label>                
                <FormControl as="select" id="criptomoeda1" onChange={this.setCriptomoeda1.bind(this)}>
                    <option value={Criptomoedas.Bitcoin} label={Criptomoedas.Bitcoin}></option>
                    <option value={Criptomoedas.Brita} label={Criptomoedas.Brita}></option>               
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Col>
    
         
            {/* Caso a operação seja troca exibir esse campo */}
            <Col md="6">
                <Form.Label>CriptoMoeda2</Form.Label>
                <FormControl as="select" id="criptomoeda2"
                onChange={this.setCriptomoeda2.bind(this)}>
                    <option value={Criptomoedas.Bitcoin} label={Criptomoedas.Bitcoin}></option>
                    <option value={Criptomoedas.Brita} label={Criptomoedas.Brita}></option>          
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Col>
            
           
            <Col md="12">
                <Button variant="success" id="btn-ok" onClick={this.Adiciona}>OK</Button>
            </Col>
            
            </Row>
            </Form>
                                 
            </Container> )                                  
    }

}