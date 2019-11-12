
import { ICotacaoBitcoin } from "../models/interfaces-api/Interfaces";
import { DateHelper } from "../helpers/DateHelper";
import { Cotacao } from "../models/Cotacao";
import { Criptomoedas } from "../models/Tipos";


export function _1RealEmBitcoins(): Promise<number>{
    const url = "https://blockchain.info/tobtc?currency=BRL&value=1";
        return fetch(url)
        .then(res => {
           return res.json().then(result => {
                var cotacao = new Cotacao(parseFloat(result), new Date(), Criptomoedas.Bitcoin);
                cotacao.Create();
                return result;
           })
            
        })        
        .catch(err => {
            alert("Houve algum problema ao realizar essa consulta.") 
            console.log(err);              
        });  
}

export function _1RealEmBritas() : Promise<number>{
    return CotacaoBrita()
    .then(res => {
        var result = 1 / res;
        var cotacao = new Cotacao(result, new Date(), Criptomoedas.Brita);
        cotacao.Create();
        return result;
    });
}


export function CotacaoBrita() : Promise<number>{
        
    function UrlBrita(data : Date = new Date()) :  string{
        return "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao=%27"
        +DateHelper.toDateCotacaoBrita(data)
        +"%27&%24format=json";   
    }    

    return new Promise((resolve,reject) => {                
        var url = UrlBrita();

        console.log('1ª tentativa data atual:',url)

        fetch(url)
        .then(res => {            
            res.json().then(dt => {          
                try { 
                    resolve(parseFloat(dt.value[0].cotacaoCompra));
                } 
                catch (err) {     

                    var dia_util_anterior = DateHelper.DiaUtilAnterior(new Date());   
                    url = UrlBrita(dia_util_anterior);

                    console.log('2ª tentativa dia util anterior:',url)

                    fetch(url)
                    .then(res => {
                        res.json().then(dt => {
                            try {
                                resolve(parseFloat(dt.value[0].cotacaoCompra));
                            } 
                            catch (err) {  

                                console.log('3ª tentativa - Obtendo ultima cotação salva no banco para a criptomoeda ', Criptomoedas.Brita)         
                                
                                new Cotacao().ObterUltimaCotacao(Criptomoedas.Brita).then( valor_ultima_cotacao =>{
                                    console.log('ultima cotação salva no banco:',valor_ultima_cotacao);
                                    if(valor_ultima_cotacao > 0){                        
                                        resolve(valor_ultima_cotacao);
                                    }
                                })
                                
                                PubSub.publish("update-msg", ['err','Houve um erro ao realizar o parse da cotação da brita.',true])
                                console.log(err)     
                            } 
                        })
                    }) 
                }                    
               
            })
        })   
        
        .catch(err => {
            PubSub.publish("update-msg", ['err','Houve um erro ao consultar a cotação da brita.',true])                      
            reject(err)       
        }); 
    })  
}

export function  CotacaoBitcoin() : Promise<ICotacaoBitcoin> {
    const url = "https://www.mercadobitcoin.net/api/BTC/ticker/";

    return fetch(url)
    .then(res => res.json())   
 
    .catch(err => {
        PubSub.publish("update-msg", ['err','Houve um erro ao consultar a cotação do bitcoin.',true])       
        console.log(err);              
    });   
}


