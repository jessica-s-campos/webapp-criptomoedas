
import { useIndexedDB } from 'react-indexed-db';

export default class Cliente{
        
    public readonly id : number = 0;
    public dinheiro : number;
    public bitcoins : number;
    public britas : number;

    constructor(public nome: string, public email: string, public senha: string){
        this.nome = nome;
        this.email = email;
        this.senha = senha;   
        this.dinheiro = 100000;                 
        this.britas = 0;                 
        this.bitcoins = 0;                 
    }    


    public Create() {
        console.log(this)
        useIndexedDB('cliente').add(this).then( o => {
         console.log('cliente criado')
        });
    }
    
     Logar() : Promise<number>{       
        return useIndexedDB('cliente').getAll()
        .then((cli : Array<Cliente>) => {
            return cli.filter(o => o.email == this.email && o.senha == this.senha)[0].id;                                 
        })     
    }


    getDinheiro(): number{      
        return this.dinheiro;
    }

    setDinheiro(valor : number){
        this.dinheiro = valor;
    }
    
}