import Movimentacao from "./Movimentacao";

export default class Extrato{
    private extrato : Array<Movimentacao>;

    constructor(){
        this.extrato = new Array<Movimentacao>();
    }

    public getExtrato(){
        return this.extrato;
    }

    public sort(){
        return this.extrato.sort();
    }

    public filter(data: Date){
        return this.extrato.filter(el => el.data === data);
    }
   
}




