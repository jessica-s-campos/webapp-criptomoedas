
import Cliente from "./Cliente";
import { Operacoes, Criptomoedas } from "./Tipos";
import { useIndexedDB } from 'react-indexed-db';
import { _1RealEmBritas, _1RealEmBitcoins } from "../helpers/Convert";
import { number } from "prop-types";


export default class Movimentacao{   
          
    public data : Date;
    public quantidade : number;
    public cotacao : number;
    public cliente_id : number;

    constructor(public operacao: Operacoes, public valor: number = 0, public criptomoeda1: Criptomoedas, public criptomoeda2: Criptomoedas ){
        this.criptomoeda1 = criptomoeda1;
        this.criptomoeda2 = criptomoeda2;
        this.data = new Date();
        this.operacao = operacao;
        this.valor = valor;        

        this.quantidade = 0;  
        this.cotacao = 0
        this.cliente_id = 0;
    }

    RealizaMovimentacao(){
        var id = localStorage.getItem('cliente'); 
        var total = 0;   
        this.cliente_id = id == null ? 0 : Number.parseInt(id);
            
            useIndexedDB('cliente').getByID<Cliente>(this.cliente_id)
            .then(cliente => {             
                
                if(this.operacao == Operacoes.Comprar){
                 
                    if(cliente.dinheiro < this.valor)
                    {
                        console.log('Não tem dinheiro suficiente.')
                    }
                    else
                    {                                               
                        

                        if(this.criptomoeda1 == Criptomoedas.Bitcoin){
                            
                            _1RealEmBitcoins().then(res => {
                                console.log('_1RealEmBitcoins')
                                total = this.valor * res;
                                cliente.dinheiro = cliente.dinheiro - this.valor;
                                cliente.bitcoins = total;
                                console.log('total :',total)
                                console.log('valor :',this.valor)
                                console.log('saldo dinheiro :',cliente.dinheiro)
                                console.log('saldo britas :',cliente.britas)
                                console.log('saldo bitcoins :',cliente.bitcoins)
                            })
                            
                        }

                        if(this.criptomoeda1 == Criptomoedas.Brita){
                            
                            _1RealEmBritas().then(res => {
                                console.log('_1RealEmBritas')
                                total = this.valor * res;
                                cliente.dinheiro = cliente.dinheiro - this.valor;
                                cliente.britas = total;
                                console.log('total :',total)
                                console.log('valor :',this.valor)
                                console.log('saldo dinheiro :',cliente.dinheiro)
                                console.log('saldo britas :',cliente.britas)
                                console.log('saldo bitcoins :',cliente.bitcoins)
                            })
                            
                        }

                        
                    }
                }

                if(this.operacao == Operacoes.Vender){
                    console.log('Vendendo :', this.criptomoeda1)                                  

                    if(this.criptomoeda1 == Criptomoedas.Bitcoin){
                            
                        _1RealEmBitcoins().then(res => {
                            console.log('_1RealEmBitcoins')
                            total = this.valor * res;
                            cliente.dinheiro = cliente.dinheiro + total;
                            console.log('total :',total)
                            console.log('valor :',this.valor)
                            console.log('dinheiro :',cliente.dinheiro)
                        })
                        
                    }

                    if(this.criptomoeda1 == Criptomoedas.Brita){
                        
                        _1RealEmBritas().then(res => {
                            console.log('_1RealEmBritas')
                            total = this.valor * res;
                            cliente.dinheiro = cliente.dinheiro + total;
                            console.log('total :',total)
                            console.log('valor :',this.valor)
                            console.log('dinheiro :',cliente.dinheiro)
                        })
                        
                    }

                    
                }

                if(this.operacao == Operacoes.Trocar){
                    console.log(`Trocando : ${this.criptomoeda1} por ${this.criptomoeda2}`)  
                    
                    
                }



                // useIndexedDB('saldo').add({dinheiro : 120, bitcoin: 2, brita: 3}).then( o => {
                //     console.log(o)

                //     PubSub.publish("saldo-atualizado", 0)           
                // });

                // useIndexedDB('movimentacao').add(this).then( o => {
                //     console.log(o)

                //     PubSub.publish("nova-operacao", 0)           
                // });
                

            })
            .catch(err => { return Error(err) });
        

        
       
            
    }

 
}
