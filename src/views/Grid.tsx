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
import { Criptomoedas } from '../models/Tipos';
import CriptoMoeda from '../models/CriptoMoeda';

class FiltroExtrato extends Component{

 
    state = {data: '' , operacao: ''}
   
    Filtra(){
      
    }

    render() {
        return <Row>   
           
             <Form.Group as={Col} md="6">
                <Form.Label>Data</Form.Label>
                <Form.Control 
                as="input" 
                id="filtro-data" 
                onChange={this.Filtra}
                >                 
                </Form.Control>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Form.Group>
        
            <Form.Group as={Col} md="6">
                <Form.Label>Operação</Form.Label>
                <Form.Control 
                as="select" 
                id="filtro-operacao"
               
                onChange={this.Filtra}           
                >
                    <option>Comprar</option>
                    <option>Vender</option>               
                    <option>Trocar</option>               
                </Form.Control>
                <Form.Control.Feedback type="invalid">              
                </Form.Control.Feedback>
            </Form.Group>
           
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
                                <tr>
                                <td>{m.data.getDate()}/{m.data.getMonth() +1}/{m.data.getFullYear()}</td>
                                <td>{m.operacao}</td>
                                <td>{m.criptomoeda1}</td>
                                <td>{m.criptomoeda2}</td>
                                <td>{m.valor}</td>
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
        PubSub.subscribe('nova-operacao',(topis: any, data : any) => {  
            useIndexedDB('movimentacao').getAll().then( (mov:Array<Movimentacao>) => {
                this.setState({extrato : mov})
            });
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