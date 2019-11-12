
import { Criptomoedas } from "./Tipos";
import { useIndexedDB } from "react-indexed-db";

export class Cotacao{
    
    constructor(public ultimacotacao: number = 0,public data: Date = new Date(), public moeda: Criptomoedas = Criptomoedas.Bitcoin){
        this.data = data;
        this.ultimacotacao = ultimacotacao;
        this.moeda = moeda;
    }

    Create(){
        var jaexiste : boolean;
        
        useIndexedDB('cotacao').getAll()
        .then(lista => {
            jaexiste = lista.filter( o=> o.data.getDate() == this.data.getDate() && o.moeda == this.moeda).length > 0;

            if(!jaexiste)
                useIndexedDB('cotacao').add(this);
        })
        
    }

    ObterUltimaCotacao(moeda: Criptomoedas = Criptomoedas.Bitcoin) : Promise<number> {        
        return useIndexedDB('cotacao').getAll()
        .then((lista : Array<Cotacao>) => {        
           return lista.filter( o => o.moeda === moeda).reverse()[0].ultimacotacao;
        });        
    }
   
}