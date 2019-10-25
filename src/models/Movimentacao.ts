import CriptoMoeda from "./CriptoMoeda";

export default class Movimentacao{
        
    constructor(
        public data: Date = new Date(), public operacao: string, public valor: number = 0, public criptomoeda1: CriptoMoeda, public criptomoeda2: CriptoMoeda ){
        this.criptomoeda1 = criptomoeda1;
        this.criptomoeda2 = criptomoeda2;
        this.data = data;
        this.operacao = operacao;
        this.valor = valor;
    }

    RealizaMovimentacao(){

    }
 
}
