import React, { Component } from 'react'; 
import Select from 'react-select'; 
import { Criptomoedas, Operacoes } from '../models/Tipos';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Movimentacao, { Op } from '../models/Movimentacao';
import PubSub from 'pubsub-js'
import { AccessDB,useIndexedDB } from 'react-indexed-db';

export interface State{  
    operacao : string;
    moeda: string;
    valor : any;
    data : Date;
}

export class Operacao extends React.Component<{}, State>{
    constructor(props: any) {
        super(props);
        this.state = { operacao: Operacoes.Comprar, moeda : Criptomoedas.Bitcoin, valor : 0, data : new Date()};
      }    

  
    Adiciona = () => {  
           
        useIndexedDB('movimentacao')
        .add({data : this.state.data, operacao : this.state.operacao, valor : this.state.valor, criptomoeda1 : this.state.moeda });
       var mov = new Movimentacao(this.state.data, this.state.operacao, this.state.valor, this.state.moeda)
       
        PubSub.publish("nova-operacao", 1)        
    }

    setOperacao(o : any){           
        this.setState({operacao : o.target.value}); 
    }

    setMoeda(o : any){           
        this.setState({moeda : o.target.value}); 
    }

    setValor(o : any){           
        this.setState({valor : o.target.value}); 
    }

    render() {
        
        return (<Container>
            <Container>
            <Container>
          
            <Form.Group as={Row} md="4">
                <Form.Label>CriptoMoeda</Form.Label>
                <FormControl as="select" id="operacao" value={this.state.operacao} onChange={this.setOperacao.bind(this)}>
                    <option value={Operacoes.Comprar}>Comprar</option>
                    <option value={Operacoes.Vender} >Vender</option>
                    <option value={Operacoes.Trocar} >Trocar</option>         
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Form.Group>
           
            <Form.Group as={Row} md="4">
                <Form.Label>CriptoMoeda</Form.Label>
                <FormControl as="select" id="criptomoeda" value={this.state.moeda}  onChange={this.setMoeda.bind(this)}>
                    <option value={Criptomoedas.Bitcoin}>Bitcoin</option>
                    <option value={Criptomoedas.Brita}>Brita</option>               
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Form.Group>
    
            
            <Form.Group as={Row} md="4">
                <Form.Label>Valor</Form.Label>
                <FormControl as="input" id="valor" value={this.state.valor}  onChange={this.setValor.bind(this)}> 
                    
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group as={Row} md="4">
                <Button variant="success" id="btn-ok" onClick={this.Adiciona}>OK</Button>
            </Form.Group>
         
            </Container>                           
            </Container>                           
            </Container> )                                  
    }

}