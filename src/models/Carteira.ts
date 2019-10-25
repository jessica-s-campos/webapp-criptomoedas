import { CriptoMoeda } from "./CriptoMoeda";
import { Brita } from "./Brita";
import { Bitcoin } from "./Bitcoin";

export class Carteira {

    private criptomoedas: Array<CriptoMoeda>;
    private dinheiro : number;

    constructor(){
        this.criptomoedas = new Array<CriptoMoeda>();    
        this.dinheiro = 100000;        
    }

    getDinheiro() : number{
        return this.dinheiro;
    }

    Comprar(valor : number, moeda : CriptoMoeda) : void {
        
    }

    Vender(valor : number, moeda : CriptoMoeda) : void {

    }

    Trocar(valor : number, moedaTroca: CriptoMoeda) : void{

    }

}