import React, { Component } from 'react'; 
import Select from 'react-select'; 
import { Criptomoedas, Operacoes } from '../models/Tipos';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Movimentacao from '../models/Movimentacao';
import PubSub from 'pubsub-js'
import { AccessDB,useIndexedDB } from 'react-indexed-db';
import CriptoMoeda from "../models/CriptoMoeda";
import { Bitcoin } from '../models/Bitcoin';
import { Brita } from '../models/Brita';
import Input from 'react-select/src/components/Input';

export interface State{  
    operacao : string;
    criptomoeda1: CriptoMoeda;
    criptomoeda2: CriptoMoeda;
    valor : any;
    data : Date;
}

export class Operacao extends React.Component<{}, State>{
    constructor(props: any) {
        super(props);
        this.state = { operacao: Operacoes.Comprar, criptomoeda1 : new Bitcoin(), criptomoeda2 : new Brita(), valor : 0, data : new Date()};
      }    

  
    Adiciona = () => {  
           
        if(this.state.operacao == Operacoes.Trocar){
            if(this.state.criptomoeda1 == this.state.criptomoeda2){
                alert('Na operação de troca as moedas não podem ser iguais')
                return;
            }            
        }

        if(this.state.valor == 0 || this.state.valor < 0){
            alert('O valor não foi informado ou é negativo.')
            return;
        }

       console.log(this.state.criptomoeda1.ObterCotacao(new Date()))
       console.log(this.state.criptomoeda2.ObterCotacao(new Date()))

        var mov = new Movimentacao(this.state.data, this.state.operacao, this.state.valor, this.state.criptomoeda1,this.state.criptomoeda2)
       
        PubSub.publish("nova-operacao", 1)                    
    }

    setOperacao(o : any){           
        this.setState({operacao : o.target.value}); 
    }

    setCriptomoeda1(o : any ){   
        if(o == Criptomoedas.Bitcoin) {
            this.setState({criptomoeda2 : new Bitcoin() }); 

            if(this.state.operacao == Operacoes.Trocar)
                this.setState({criptomoeda1 : new Brita()})
        }else{
            this.setState({criptomoeda2 : new Brita() }); 

            if(this.state.operacao == Operacoes.Trocar)
                this.setState({criptomoeda1 : new Bitcoin() }); 
        }                 
    }

    setCriptomoeda2(o : any){    
        if(o == Criptomoedas.Bitcoin) {
            this.setState({criptomoeda2 : new Bitcoin() }); 

            if(this.state.operacao == Operacoes.Trocar)
                this.setState({criptomoeda1 : new Brita()})
        }else{
            this.setState({criptomoeda2 : new Brita() }); 

            if(this.state.operacao == Operacoes.Trocar)             
                this.setState({criptomoeda1 : new Bitcoin() }); 
        }         
    }

    setValor(o : any){ 
        if(o == 0){
            alert('Valor não pode ser 0')
        }  
        else if(o < 0){
            alert('Valor não pode ser negativo')
             
        } else{
            this.setState({valor : (o as number)}); 
        }             
    }

    render() {
        
        return (<Container>
            <Container>
            <Container>
          
            <Form.Group as={Row} md="4">
                <Form.Label>Operação</Form.Label>
                <FormControl as="select" id="operacao" value={this.state.operacao} onChange={this.setOperacao.bind(this)}>
                    <option value={Operacoes.Comprar}>{Operacoes.Comprar}</option>
                    <option value={Operacoes.Vender} >{Operacoes.Vender}</option>
                    <option value={Operacoes.Trocar} >{Operacoes.Trocar}</option>         
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Form.Group>
           
            <Form.Group as={Row} md="4">
                <Form.Label>CriptoMoeda1</Form.Label>                
                <FormControl as="select" id="criptomoeda1" onChange={this.setCriptomoeda1.bind(this)}>
                    <option value={Criptomoedas.Bitcoin} label={Criptomoedas.Bitcoin}></option>
                    <option value={Criptomoedas.Bitcoin} label={Criptomoedas.Brita}></option>               
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group as={Row} md="4">
                <Form.Label>CriptoMoeda2</Form.Label>
                <FormControl as="select" id="criptomoeda2"
                onChange={this.setCriptomoeda2.bind(this)}>
                    <option value={Criptomoedas.Bitcoin} label={Criptomoedas.Bitcoin}></option>
                    <option value={Criptomoedas.Bitcoin} label={Criptomoedas.Brita}></option>          
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Form.Group>
            
            <InputGroup className="mb-3" >
                <InputGroup.Prepend>
                    <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="input" onChange={this.setValor.bind(this)}/>
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
            </InputGroup>
    
            <Form.Group as={Row} md="4">
                <Button variant="success" id="btn-ok" onClick={this.Adiciona}>OK</Button>
            </Form.Group>
         
            </Container>                           
            </Container>                           
            </Container> )                                  
    }

}