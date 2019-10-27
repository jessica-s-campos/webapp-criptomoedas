import { ICotacao } from "./interfaces-api/Interfaces";

export default abstract class CriptoMoeda {

    public saldo: number;
    public cotacaoCompra: number;
    public cotacaoVenda: number;

    constructor(){
        this.saldo = 0
        this.cotacaoCompra = 0
        this.cotacaoVenda = 0
    }
    
    abstract ObterCotacao(dataCotacao : Date) : Promise<ICotacao>;
}