import CriptoMoeda  from "./CriptoMoeda";
import { DateHelper } from "../helpers/DateHelper";
import { ICotacaoBrita } from "./interfaces-api/Interfaces";

export class Brita extends CriptoMoeda {
        
    constructor(){
        super();
        this.ObterCotacao(new Date()).then((o : ICotacaoBrita) => {
            console.log('then brita')
            this.cotacaoCompra = o.cotacaoCompra;
            this.cotacaoVenda = o.cotacaoVenda;
        })
    }

    ObterCotacao(dataCotacao : Date) : Promise<ICotacaoBrita>{
        
        const url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao=%27"
        +DateHelper.toDateCotacaoBrita(dataCotacao)
        +"%27&%24format=json";

        return fetch(url)
        .then(res => res.json())   
        
        .catch(err => {
            alert("Houve algum problema ao consultar a cotação dessa moeda.");
            console.log(err);        
        });     
    }
    
}