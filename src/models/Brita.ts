import { CriptoMoeda } from "./CriptoMoeda";
import { DateHelper } from "../helpers/DateHelper";
import { ICotacao } from "./interfaces-api/Interfaces";

export class Brita extends CriptoMoeda {
        
    constructor(){
        super();
    }

    ObterCotacao(dataCotacao : Date) : Promise<ICotacao>{
        
        const url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao=%27"
        +DateHelper.toDateCotacao(dataCotacao)
        +"%27&%24format=json";

        return fetch(url)
        .then(res => res.json())   
     
        .catch(err => {
            throw new Error(err);              
        });     
    }
    
}