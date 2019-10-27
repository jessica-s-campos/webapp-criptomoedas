import CriptoMoeda from "./CriptoMoeda";
import { Cliente } from "./Cliente";
import { Operacoes, Criptomoedas } from "./Tipos";
import { Bitcoin } from "./Bitcoin";
import { AccessDB,useIndexedDB } from 'react-indexed-db';

export default class Movimentacao{   
          
    public data : Date;
    public quantidade : number;
    public cotacao : number;

    constructor(public operacao: Operacoes, public valor: number = 0, public criptomoeda1: CriptoMoeda, public criptomoeda2: CriptoMoeda ){
        this.criptomoeda1 = criptomoeda1;
        this.criptomoeda2 = criptomoeda2;
        this.data = new Date();
        this.operacao = operacao;
        this.valor = valor;        

        this.quantidade = 0;  
        this.cotacao = 0
    }

    RealizaMovimentacao(cliente : Cliente){
        var dinheiro = cliente.getDinheiro();
       
        if(this.operacao == Operacoes.Comprar){            
            //verificar se saldo em dinheiro permite comprar a criptomoeda1
            if(this.valor <= cliente .getDinheiro()){
                if(cliente.getDinheiro() >= this.criptomoeda1.cotacaoCompra)
               
                this.quantidade = this.valor / this.criptomoeda1.cotacaoCompra;               
                this.cotacao = this.criptomoeda1.cotacaoCompra;

                cliente.setDinheiro(this.valor);       
            }
        
        }

        if(this.operacao == Operacoes.Trocar){            
            //verificar se será possivel completar a trocar usando o dinheiro (não esta claro no requisito do desafio)
           
        }

        useIndexedDB('movimentacao').add(this).then( o => {
            PubSub.publish("nova-operacao", 0)           
        });
            
    }

 
}
