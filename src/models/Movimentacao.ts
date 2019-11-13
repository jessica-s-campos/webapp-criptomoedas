
import Saldo from "./Saldo";
import Cliente from "./Cliente";
import { Operacoes, Criptomoedas } from "./Tipos";
import { useIndexedDB } from 'react-indexed-db';
import { _1RealEmBritas, _1RealEmBitcoins } from "../helpers/Convert";

var total = 0;   
var saldo : Saldo;

export default class Movimentacao{   
          
    public data : Date;
    public quantidade : number;
    public cotacao : number;
    public cliente_id : number;
    public cliente : Cliente = new Cliente();

    constructor(public operacao: Operacoes = Operacoes.Comprar, public valor: number = 0, public criptomoeda1: Criptomoedas = Criptomoedas.Bitcoin, public criptomoeda2: Criptomoedas = Criptomoedas.Brita ){
        this.criptomoeda1 = criptomoeda1;
        this.criptomoeda2 = criptomoeda2;
        this.data = new Date();
        this.operacao = operacao;
        this.valor = valor;        

        this.quantidade = 0;  
        this.cotacao = 0
        this.cliente_id = 0;
    }

    ObtemMovimentacao(cliente_id : number) : Promise<Array<Movimentacao>>{
        return useIndexedDB('movimentacao').getAll().then( (mov : Array<Movimentacao>) => {
            return mov.filter( o=> o.cliente_id == cliente_id);
        });
    }

    RealizaMovimentacao(){    
  
        var id = JSON.parse(localStorage.getItem('cliente') || '{}').id;

        saldo = new Saldo()
        saldo.ObterUltimoSaldo(id).then( s => {
            saldo = s;            
        });

        this.cliente_id = id == null ? 0 : Number.parseInt(id);
            
            useIndexedDB('cliente').getByID<Cliente>(this.cliente_id)
            .then(cli => {             
                this.cliente = cli;
                this.cliente.saldo = saldo;

                if(this.operacao == Operacoes.Comprar){                   
                   this.Comprar();
                }

                if(this.operacao == Operacoes.Vender){
                    this.Vender();
                }

                if(this.operacao == Operacoes.Trocar){
                   this.Trocar();                    
                }

            })
            .catch(err => { return Error(err) });
  
    }

    AtualizaSaldo(){
        saldo = new Saldo(this.cliente.saldo.dinheiro,
            this.cliente.saldo.britas,
            this.cliente.saldo.bitcoins)
            saldo.cliente_id = this.cliente_id;
            saldo.Create();           
    }

    InsereMovimentecao(){
        useIndexedDB('movimentacao').add(this).then( o => {
            console.log(o)                
            PubSub.publish("nova-operacao", o)           
        });
    }

    ExibeInformacoes(total : number){
        console.log('cliente da transacao:',this.cliente_id)
        console.log('total :',total)
        console.log('valor :',this.valor)
        console.log('saldo dinheiro :',this.cliente.saldo.dinheiro)
        console.log('saldo britas :',this.cliente.saldo.britas)
        console.log('saldo bitcoins :',this.cliente.saldo.bitcoins)
    }

    Comprar() {
        if(Number.parseFloat(this.cliente.saldo.dinheiro.toString()) < this.valor)                    
        PubSub.publish("update-msg", ['err','Não há dinheiro suficiente para realizar a operação.',true])          
    
        else
        {                                               
            if(this.criptomoeda1 == Criptomoedas.Bitcoin){
                
                _1RealEmBitcoins().then(res => {
                    console.log('_1RealEmBitcoins:', res)                               
                    total = this.valor * res;
                    this.cliente.saldo.dinheiro = this.cliente.saldo.dinheiro - this.valor;
                    this.cliente.saldo.bitcoins = this.cliente.saldo.bitcoins + total;
                                                    
                    this.ExibeInformacoes(total);
                    this.AtualizaSaldo();
                    this.InsereMovimentecao();
                })                            
            }

            if(this.criptomoeda1 == Criptomoedas.Brita){
                
                
                _1RealEmBritas().then(res => {
                    console.log('_1RealEmBritas:',res)
                    
                    total = this.valor * res;
                    this.cliente.saldo.dinheiro = this.cliente.saldo.dinheiro - this.valor;
                    this.cliente.saldo.britas = this.cliente.saldo.britas + total;
                
                    this.ExibeInformacoes(total);
                    this.AtualizaSaldo();
                    this.InsereMovimentecao();
                })                          
            }                        
        }
    }

    Vender(){
        console.log('Vendendo :', this.criptomoeda1)                                  

        if(this.criptomoeda1 == Criptomoedas.Bitcoin){
                
            _1RealEmBitcoins().then(res => {
                console.log('_1RealEmBitcoins:', res)

                total = this.valor * res;
                if(this.cliente.saldo.bitcoins >= total){
                    this.cliente.saldo.dinheiro = this.cliente.saldo.dinheiro + this.valor;
                    this.cliente.saldo.bitcoins = this.cliente.saldo.bitcoins - total;

                    this.ExibeInformacoes(total);        
                    this.AtualizaSaldo();
                    this.InsereMovimentecao();  
                }else{
                    PubSub.publish("update-msg", ['err','Não há saldo de bitcoins suficiente para realizar a operação.',true])   
                }
                                 
            })                        
        }

        
        if(this.criptomoeda1 == Criptomoedas.Brita){
            
            _1RealEmBritas().then(res => {
                console.log('_1RealEmBritas')
                total = this.valor * res;
                if(this.cliente.saldo.britas >= total){
                    this.cliente.saldo.dinheiro = this.cliente.saldo.dinheiro + this.valor;
                    this.cliente.saldo.britas = this.cliente.saldo.britas - total;
    
                    this.ExibeInformacoes(total);        
                    this.AtualizaSaldo();
                    this.InsereMovimentecao();   
                }else{
                    PubSub.publish("update-msg", ['err','Não há saldo de britas suficiente para realizar a operação.',true])   
                }                
            })
            
        }
    }

    Trocar(){
        console.log(`Trocando : ${this.criptomoeda1} por ${this.criptomoeda2}`)  

        _1RealEmBitcoins().then(_mult_bitcoin => {                 
           
            _1RealEmBritas().then(_mult_brita => {              

                if(this.criptomoeda1 == this.criptomoeda2){
                    PubSub.publish("update-msg", ['err','Não é possível realizar a operação de troca de criptomoedas iguais',true]);
                    return;
                }
                //retirar
                if(this.criptomoeda1 == Criptomoedas.Brita){
                    total = this.valor * _mult_brita;
                    
                    if(this.cliente.saldo.britas < total){
                        PubSub.publish("update-msg", ['err','Não há saldo de britas suficiente para realizar a operação.',true]);
                        return;
                    }                        
                    else{
                        this.cliente.saldo.britas = this.cliente.saldo.britas - total;
                    }                        
                }else{
                    total = this.valor * _mult_bitcoin;

                    if(this.cliente.saldo.bitcoins < total){
                        PubSub.publish("update-msg", ['err','Não há saldo de bitcoins suficiente para realizar a operação.',true])   ;
                        return;
                    }                        
                    else{
                        this.cliente.saldo.bitcoins = this.cliente.saldo.bitcoins - total;
                    }                        
                }
                
                //aumentar
                if(this.criptomoeda2 == Criptomoedas.Brita){
                    total = this.valor * _mult_brita;
                    this.cliente.saldo.britas = this.cliente.saldo.britas + total;
                }else{
                    total = this.valor * _mult_bitcoin;
                    this.cliente.saldo.bitcoins = this.cliente.saldo.bitcoins + total;
                }

                this.ExibeInformacoes(total);        
                this.AtualizaSaldo();
                this.InsereMovimentecao();   
                       
            }) 

        })   
    }
    

 
}
