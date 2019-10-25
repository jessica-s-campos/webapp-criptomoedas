import { ICotacao } from "./interfaces-api/Interfaces";

export default abstract class CriptoMoeda {

    private saldo: number;
    protected cotacaoCompra: number;
    protected cotacaoVenda: number;

    constructor(){
        this.saldo = 0
        this.cotacaoCompra = 0
        this.cotacaoVenda = 0
    }
    
    abstract ObterCotacao(dataCotacao : Date) : Promise<ICotacao>;

    getSaldo() : number{
        return this.saldo;
    }

    getCotacaoCompra() : number{
        return this.cotacaoCompra;
    }

    getCotacaoVenda() : number{
        return this.cotacaoVenda;
    }


    setSaldo(valor: number){
        this.saldo = this.saldo + valor;
    }
}