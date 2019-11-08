
import { ICotacaoBrita,ICotacaoBitcoin } from "../models/interfaces-api/Interfaces";
import { DateHelper } from "../helpers/DateHelper";
import { resolve } from "q";

export function _1RealEmBitcoins(): Promise<number>{
    const url = "https://blockchain.info/tobtc?currency=BRL&value=1";
        return fetch(url)
        .then(res => res.json())        
        .catch(err => {
            alert("Houve algum problema ao realizar essa consulta.") 
            console.log(err);              
        });  
}

export function _1RealEmBritas() : Promise<number>{
    return CotacaoBrita(new Date())
    .then(cotacao => 1 / cotacao);
    //.then( o => 1 / 4.0035);
}

export function CotacaoBrita(dataCotacao : Date) : Promise<number>{
        
    return new Promise((resolve,reject) => {
        const url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao=%27"
        +DateHelper.toDateCotacaoBrita(dataCotacao)
        +"%27&%24format=json";
        fetch(url)
        .then(res => {
            
            res.json().then(dt => {    
                console.log(dt.value[0]);
                
                resolve(parseFloat(dt.value[0].cotacaoCompra));
            })
        })   
        
        .catch(err => {
            alert("Houve algum problema ao consultar a cotação da brita.");
            reject(err)       
        }); 
    })  
}

export function  CotacaoBitcoin() : Promise<ICotacaoBitcoin> {
    const url = "https://www.mercadobitcoin.net/api/BTC/ticker/";

    return fetch(url)
    .then(res => res.json())   
 
    .catch(err => {
        alert("Houve algum problema ao consultar a cotação do bitcoin.") 
        console.log(err);              
    });   
}


