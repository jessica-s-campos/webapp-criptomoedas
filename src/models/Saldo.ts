import { useIndexedDB } from 'react-indexed-db';

export default class Saldo{
        
    public readonly cliente_id : number = 0;
    public bitcoins : number;
    public dinheiro : number;
    public britas : number;

    constructor(_dinheiro : number, _britas : number, _bitcoins : number){
        this.dinheiro = _dinheiro;                 
        this.britas = _britas;                 
        this.bitcoins = _bitcoins;                 
    }    


    Create() { 
        useIndexedDB('saldo').add(this).then( id => {
            if(id > 0)
                PubSub.publish("saldo-atualizado", id); 
            else
                console.log('Saldo não inserido');
        }).catch(err => console.log(err));
    }
       
}