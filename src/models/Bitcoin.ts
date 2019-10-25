import CriptoMoeda from "./CriptoMoeda";
import { ICotacaoBitcoin } from "./interfaces-api/Interfaces";
import { DateHelper } from "../helpers/DateHelper";

export class Bitcoin extends CriptoMoeda {

    constructor(){
        super();
        this.ObterCotacao(new Date());
    }

    ObterCotacao(dataCotacao : Date) : Promise<ICotacaoBitcoin> {
        const url = "https://www.mercadobitcoin.net/api/BTC/day-summary/"
        +DateHelper.toDateCotacaoBitcoin(dataCotacao);

        return fetch(url)
        .then(res => res.json())   
     
        .catch(err => {
            throw new Error(err);              
        });   
    }

}