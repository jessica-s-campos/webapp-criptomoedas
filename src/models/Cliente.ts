
import { useIndexedDB } from 'react-indexed-db';
import Saldo from './Saldo';

export default class Cliente{
        
    public readonly id : number = 1;  
    public saldo : Saldo = new Saldo(100000,0,0);

    constructor(public nome: string, public email: string, public senha: string){
        this.nome = nome;
        this.email = email;
        this.senha = senha;                
    }    


    public Create() {    
        useIndexedDB('cliente').add(this).then( o => {        
         this.saldo.Create();
        });
    }    
    
     Logar() : Promise<number>{       
        return useIndexedDB('cliente').getAll()
        .then((cli : Array<Cliente>) => {
            return cli.filter(o => o.email == this.email && o.senha == this.senha)[0].id;                                 
        })     
    }

}