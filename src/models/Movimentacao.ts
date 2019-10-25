export default class Movimentacao{
        
    constructor(
        public data: Date = new Date(), public operacao: string = "", public valor: number = 0, public moeda: string = ""){
        this.moeda = moeda;
        this.data = data;
        this.operacao = operacao;
        this.valor = valor;
    }

 
}

export enum Op{
    troca,
    venda,
    compra
}