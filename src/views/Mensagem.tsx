import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/blog.css'
import Container from 'react-bootstrap/Container';

export class Mensagem extends Component<{},{tipo : string, mensagem : string, show : boolean}>{

    constructor(props: any){
        super(props);        
        this.state = { tipo : 'success', mensagem : '', show : false}        
    }

    componentDidMount(){
        PubSub.subscribe('update-msg',(topis: any, data : any) => {            
            this.setState({tipo : data[0], mensagem : data[1], show : data[2]});

            setTimeout(() => {
                this.setState({tipo : '', mensagem : '', show : false});
            }, 2000);
        });
    }

    render() {
        return <Container className="txt-align">               
            {
                this.state.tipo == "success"
                ? 
                    <label className="success-msg">{this.state.mensagem}</label> 
                :
                    <label className="err-msg">{this.state.mensagem}</label>                 
            }
           
          
        </Container>        
    }

}