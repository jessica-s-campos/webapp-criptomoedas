import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../css/style.css'
import { Header } from './Header';
import Cliente  from '../models/Cliente';
import { Mensagem } from './Mensagem';
import logoApp from '../imagens/bitcoin.png';

export interface ICliente{  
    nome: string,
    email: string,
    senha: string
}


class CadastroCliente extends Component<{},ICliente> {

    constructor(props: any) {
        super(props);
        this.state = { nome: '', email: '', senha: ''};
    }   


    setNome(o : any){ 
        o.persist();        
        this.setState({nome : o.target.value});                   
    }

    setEmail(o : any){ 
        o.persist();        
        this.setState({email : o.target.value});                   
    }

    setSenha(o : any){ 
        o.persist();        
        this.setState({senha : o.target.value});                   
    }

	Adiciona = () => {
        var cliente = new Cliente(this.state.nome, this.state.email, this.state.senha);        
        cliente.Create();    
        this.setState({ nome: '', email: '', senha: ''});    
    }
       
	render(){
		return (<Container>
                
                <div>
                <Header titulo="Cadastro"></Header>   
                    <Col md="12">
                        <label htmlFor="nome">Nome</label>
                        <input className="form-control font-valores" type="text" id="nome" value={this.state.nome} onChange={this.setNome.bind(this)}/>
                    </Col>
                
                    <Col md="12">
                        <label htmlFor="senha">E-mail</label>
                        <input className="form-control font-valores"  placeholder="seuemail@dominio.com.br" type="email" id="email" value={this.state.email} onChange={this.setEmail.bind(this)}/>
                    </Col>                
                
                    <Col md="12">
                        <label htmlFor="senha">Senha</label>
                        <input className="form-control font-valores" type="password" id="senha" value={this.state.senha} onChange={this.setSenha.bind(this)}/>
                    </Col>            
            
                            
                    <Col md="12" className="botao-padrao">
                        <Button variant="success"onClick={this.Adiciona}>Cadastrar</Button>
                    </Col>
                </div>
            </Container> 

		);		
	}
}

export interface ILogin{  
    email: string,
    senha: string
}

class Login extends Component<{},ILogin> {

    msg_login : string;

    constructor(props: any) {
        super(props);
        this.state = {email: '', senha: ''};
        this.msg_login = '';
    } 

    setEmail(o : any){       
        this.setState({email : o.target.value});                   
    }

    setSenha(o : any){       
        this.setState({senha : o.target.value});                   
    }

	Entrar = () => {
       
        new Cliente('',this.state.email, this.state.senha)
        .Logar()
        .then((cliente : Cliente) => {   
            PubSub.publish("login-autorizado", cliente)               
        })
        .catch(() => {
            PubSub.publish("update-msg", ['err','Não foi encontrado nenhum cliente cadastrado com esse email e senha',true])          
        })
	}

	render(){
       
            return (<Container>
                <div>   
                <Header titulo="Login"></Header>          
                    <Col md="12">
                        <label htmlFor="login-email">E-mail</label>
                        <input className="form-control font-valores" type="email" id="login-email" value={this.state.email} onChange={this.setEmail.bind(this)}/>
                    </Col>
                    
                    <Col md="12">
                        <label htmlFor="login-senha">Senha</label>
                        <input className="form-control font-valores" type="password" id="login-senha" value={this.state.senha} onChange={this.setSenha.bind(this)}/>
                    </Col>
                            
                    <Col md="12" className="botao-padrao">
                        <Button variant="success" onClick={this.Entrar}>Entrar</Button>
                    </Col>
                
               </div>
                       
                </Container> 
    
            );	        
			
	}
}


export default class LoginBox extends React.Component {
  
    
    render() {
        return (<div>
            <div className="login">                            
                            <Row>
                                <div className="col-md-12 login-logo">
                                    
                                    <div>
                                    <img src={logoApp} width="100" height="100" alt=""/>
                                        WebApp Desafio
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <CadastroCliente/>                        
                                </div>
                                
                                <div className="col-md-6">
                                    <Login/>                         
                                </div>                                                                    
                                <Mensagem/>                         
                            </Row>     
                                              
                    </div>
                   
        </div>
        )
    }

}