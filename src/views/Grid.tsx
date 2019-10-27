import React, { Component } from 'react'; 
import Extrato from '../models/Extrato';
import Movimentacao from '../models/Movimentacao';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/blog.css';
import PubSub from 'pubsub-js'; 
import { AccessDB,useIndexedDB } from 'react-indexed-db';
import { Criptomoedas, Operacoes } from '../models/Tipos';
import CriptoMoeda from '../models/CriptoMoeda';
import { Bitcoin } from '../models/Bitcoin';
import { Brita } from '../models/Brita';
import FormControl from 'react-bootstrap/FormControl';
import InputMask from 'react-input-mask';
import Input from 'react-select/src/components/Input';

class FiltroExtrato extends Component{

 
    state = {data: '' , operacao: ''}
   
    Filtra = (o:any) => {
        this.setState({operacao : o.target.value}); 
        useIndexedDB('movimentacao').getAll().then( (mov:Array<Movimentacao>) => {
            var array = mov.filter( o => o.operacao == this.state.operacao && o.data >= new Date(this.state.data))
            PubSub.publish("grid-filtrado", array) 
         });
    }
   

    render() {
        return <Row>   
            
            <Col md="6">
            <Form.Label>Data</Form.Label>
                <FormControl as="input" id="data" value={this.state.data} onChange={this.Filtra.bind(this)}>
                  
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>         
            </Col>

            <Col md="6">
                <Form.Label>Operação</Form.Label>
                <FormControl as="select" id="operacao" value={this.state.operacao} onChange={this.Filtra.bind(this)}>
                    <option value={Operacoes.Comprar}>{Operacoes.Comprar}</option>
                    <option value={Operacoes.Vender} >{Operacoes.Vender}</option>
                    <option value={Operacoes.Trocar} >{Operacoes.Trocar}</option>         
                </FormControl>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Col>
           
        </Row>
    }

}

class GridExtrato extends Component<{lista: Array<Movimentacao>}>{
    
    render() {
        return (
            <div>
                <Table className="striped bordered hover">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>OPERAÇÃO</th>
                        <th>MOEDA</th>
                        <th>VALOR</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        this.props.lista.map(function(m) 
                        {                            
                            return (
                               
                                <tr key={m.data.getMilliseconds()}>
                                <td>{m.data.getDate()}/{m.data.getMonth() +1}/{m.data.getFullYear()}</td>
                                <td>{m.operacao}</td>
                                <td>{m.criptomoeda1 instanceof Bitcoin ? "Bitcoin" : "Brita"}</td>
                                <td>{m.criptomoeda2 instanceof Brita ? "Brita" : "Bitcoins"}</td>
                                <td>{m.valor}</td>
                                <script>
                               
                                </script>
                                </tr>
                            );
                        })  
                    }          
                </tbody>

                <tfoot>
                </tfoot>
            </Table>  
            </div>
        );
    }

}

interface IState{
    extrato: Array<Movimentacao>;
}

export default class GridBox extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = { extrato: new Array<Movimentacao>() };
      }
       
    componentDidMount(){    
        useIndexedDB('movimentacao').getAll().then( (mov:Array<Movimentacao>) => {
            this.setState({extrato : mov})
        });

        PubSub.subscribe('nova-operacao',(topis: any, data : any) => {  
            useIndexedDB('movimentacao').getAll().then( (mov:Array<Movimentacao>) => {
                this.setState({extrato : mov})
            });
        });

        PubSub.subscribe('grid-filtrado',(topis: any, data : any) => {              
            this.setState({extrato : data})            
        });
      }  

    render() {
        return (
            <div className="header">
            <FiltroExtrato/> 
            <GridExtrato lista={this.state.extrato}/> 
            </div>
        )
    }

}