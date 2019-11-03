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
        useIndexedDB('saldo').add(this)
        .then( id => {
            if(id > 0)
                PubSub.publish("saldo-atualizado", id); 
            else
                console.log('Saldo não inserido');
       
        }).catch(err => console.log(err));
    }

    ObterUltimoSaldo() : Promise<Saldo>{
        return useIndexedDB('saldo').getAll().then((lista : Array<Saldo>) =>  lista[lista.length - 1]);
    }
       
}