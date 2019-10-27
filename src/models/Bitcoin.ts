import CriptoMoeda from "./CriptoMoeda";
import { ICotacaoBitcoin } from "./interfaces-api/Interfaces";
import { DateHelper } from "../helpers/DateHelper";

export class Bitcoin extends CriptoMoeda {

    constructor(){
        super();
        this.ObterCotacao(new Date()).then((o : ICotacaoBitcoin) => {
            console.log('then bitcoin')
            this.cotacaoCompra = Number.parseFloat(o.buy);
            this.cotacaoVenda = Number.parseFloat(o.sell);
        })
    }

    ObterCotacao(dataCotacao : Date) : Promise<ICotacaoBitcoin> {
        const url = "https://www.mercadobitcoin.net/api/BTC/ticker/";

        return fetch(url)
        .then(res => res.json())   
     
        .catch(err => {
            alert("Houve algum problema ao consultar a cotação dessa moeda.") 
            console.log(err);              
        });   
    }

}