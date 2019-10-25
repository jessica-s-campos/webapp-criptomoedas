import CriptoMoeda from "./CriptoMoeda";
import { Cliente } from "./Cliente";
import { Operacoes } from "./Tipos";

export default class Movimentacao{
        
    constructor(
        public data: Date = new Date(), public operacao: Operacoes, public valor: number = 0, public criptomoeda1: CriptoMoeda, public criptomoeda2: CriptoMoeda ){
        this.criptomoeda1 = criptomoeda1;
        this.criptomoeda2 = criptomoeda2;
        this.data = data;
        this.operacao = operacao;
        this.valor = valor;
    }

    RealizaMovimentacao(cliente : Cliente){
        var dinheiro = cliente.getDinheiro();
        
        if(this.operacao == Operacoes.Comprar){            
            //verificar se saldo em dinheiro permite comprar a criptomoeda1
           
        }

        if(this.operacao == Operacoes.Trocar){            
            //verificar se é possível trocar uma pela outra
            //Ver se será possivel completar a trocar usando o dinheiro (não esta claro no requisito do desafio)
           
        }

        ///Se a movimentação tiver passado por todas as validações inserir no banco 
        //e retornar um OK pro PubSub pode disparar 
        /**
         * useIndexedDB('movimentacao')
            .add({data : this.state.data, operacao : this.state.operacao, valor : this.state.valor, criptomoeda1 : this.state.moeda });
            var mov = new Movimentacao(this.state.data, this.state.operacao, this.state.valor, this.state.moeda)
         */
    }
 
}
