import { useIndexedDB } from 'react-indexed-db';

export default class Saldo{
        
    public cliente_id : number = 0;
    public bitcoins : number;
    public dinheiro : number;
    public britas : number;

    constructor(_dinheiro : number = 0, _britas : number = 0, _bitcoins : number = 0){
        this.dinheiro = _dinheiro;                 
        this.britas = _britas;                 
        this.bitcoins = _bitcoins;
    }    


    Create() {         
        console.log(this.bitcoins)
        console.log(this.bitcoins.toFixed(7))
        useIndexedDB('saldo').add(this)
        .then( id => {
            if(id > 0)
                PubSub.publish("saldo-atualizado", id); 
            else
                console.log('Saldo não inserido');
       
        }).catch(err => console.log(err));
    }

    ObterUltimoSaldo(cliente_id : number) : Promise<Saldo>{
        return useIndexedDB('saldo').getAll().then((lista : Array<Saldo>) =>  {
            var list = lista.filter(o => o.cliente_id == cliente_id)           
            return list[list.length - 1];
        });
    }
       
}