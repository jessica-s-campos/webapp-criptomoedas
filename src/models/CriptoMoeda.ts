
import { Criptomoedas } from "./Tipos";

export default abstract class CriptoMoeda {

    public saldo: number;
    public cotacaoCompra: number;
    public cotacaoVenda: number;
   
    constructor(public criptomoeda : Criptomoedas){
        this.saldo = 0
        this.cotacaoCompra = 0
        this.cotacaoVenda = 0
        this.criptomoeda = this.criptomoeda
    }
    
    
}