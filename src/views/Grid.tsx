import React, { Component } from 'react'; 
import Movimentacao from '../models/Movimentacao';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/blog.css';
import PubSub from 'pubsub-js'; 
import { useIndexedDB } from 'react-indexed-db';
import { Criptomoedas, Operacoes } from '../models/Tipos';
import FormControl from 'react-bootstrap/FormControl';



class FiltroExtrato extends Component{
 
    state = {data: new Date(1990,1,1,) , operacao: Operacoes.Todas}

    Filtra = (o:any) => {
        var valor = o.target.value;
        var id = JSON.parse(localStorage.getItem('cliente') || '{}').id;

        if(isNaN(new Date(valor).getTime())){                  
            this.setState({operacao : valor});                      
        }else{   
            this.setState({data : new Date(valor)});        
        }
      
        useIndexedDB('movimentacao').getAll().then( (movimentacoes : Array<Movimentacao>) => {
            var array;
           
            if(this.state.operacao !== Operacoes.Todas)
                array = movimentacoes
                .filter( o => 
                    o.data.getTime() >= this.state.data.getTime() 
                    && o.cliente_id == id 
                    && o.operacao == this.state.operacao)

            else
                array = movimentacoes
                .filter( o => 
                    o.data.getTime() >= this.state.data.getTime() 
                    && o.cliente_id == id)

            console.log('grid filtrado :',array)
            PubSub.publish("grid-filtrado", array) 
         });
    }

    render() {
        return <Row>   
            
            <Col md="6">
                <label>Data</label>
                <input className="form-control" type="date" onChange={this.Filtra.bind(this)}/> 
            </Col>

            <Col md="6">
                <Form.Label>Operação</Form.Label>
                <FormControl as="select" id="operacao" value={this.state.operacao} onChange={this.Filtra.bind(this)}>
                    <option value={Operacoes.Todas}>{Operacoes.Todas}</option>
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
    condition : boolean = false;
    render() {
     
        return (
            <div>
                <Table id="grid1" className="striped bordered hover margin-grid">
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
                                {
                                    m.operacao == Operacoes.Trocar 
                                    ?
                                    <td>{m.criptomoeda1 == Criptomoedas.Bitcoin ? "Bitcoin" : "Brita"} -> {m.criptomoeda2 == Criptomoedas.Brita ? "Brita" : "Bitcoins"}</td>                        
                                    :
                                    <td>{m.criptomoeda1 == Criptomoedas.Bitcoin ? "Bitcoin" : "Brita"}</td>                        
                                }
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
                
        this.ObtemMovimentacao();

        PubSub.subscribe('nova-operacao',() => {  
            this.ObtemMovimentacao();
        });

        PubSub.subscribe('grid-filtrado',(topis: any, data : any) => {              
            this.setState({extrato : data})            
        });
      }  

    ObtemMovimentacao(){
        var id = JSON.parse(localStorage.getItem('cliente') || '{}').id;
        new Movimentacao().ObtemMovimentacao(id).then( lista => {
            this.setState({extrato : lista})
        }) 
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