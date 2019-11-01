import  CriptoMoeda  from "./CriptoMoeda";
export class Carteira {

    private criptomoedas: Array<CriptoMoeda>;
    private dinheiro : number;

    constructor(){
        this.criptomoedas = new Array<CriptoMoeda>();    
        this.dinheiro = 100000;        
        
    }

    getDinheiro() : number{    
        console.log('aqui 2')  
        return this.dinheiro;
    }

    setDinheiro(valor : number){
        return this.dinheiro = this.dinheiro - valor;
    }

    Comprar(valor : number, moeda : CriptoMoeda) : void {
        
    }

    Vender(valor : number, moeda : CriptoMoeda) : void {

    }

    Trocar(valor : number, moedaTroca: CriptoMoeda) : void{

    }

}