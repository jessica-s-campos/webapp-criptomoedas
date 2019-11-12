import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/blog.css'
import PubSub from 'pubsub-js'; 
import Saldo from '../models/Saldo';

interface IState{
    saldo_bitcoin : number,
    saldo_brita : number,
    saldo_dinheiro : number
}
var _id : number = 0;
export class SaldoView extends React.Component<any, IState>{    
  
    constructor(props: any){
        super(props);
        this.state = { saldo_bitcoin : 0, saldo_brita : 0, saldo_dinheiro : 0};
    }
   
    componentDidMount(){   
    
        _id = JSON.parse(localStorage.getItem('cliente') || '{}').id;
  
        this.ObterUltimoSaldo();          
         
        PubSub.subscribe('saldo-atualizado', () => {       
            this.ObterUltimoSaldo();                    
        });    
    }

    ObterUltimoSaldo(){       
        new Saldo().ObterUltimoSaldo(_id).then( s => {
            this.setState({saldo_bitcoin : s.bitcoins, saldo_brita : s.britas, saldo_dinheiro : s.dinheiro});
        })                 
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
                        <label className="blog-header-logo" id="saldo-dinheiro">{this.state.saldo_dinheiro}</label>
                    </Col>

                    <Col md="4">                       
                        <label className="blog-header-logo" id="saldo-bitcoins">{this.state.saldo_bitcoin}</label>       
                    </Col>
                    
                    <Col md="4">           
                        <label className="blog-header-logo" id="saldo-britas">{this.state.saldo_brita}</label>               
                    </Col>
            
                </Row>
            </div>
        </div>
            
    }

}