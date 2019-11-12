
import { useIndexedDB } from 'react-indexed-db';
import Saldo from './Saldo';

export default class Cliente{
        
    public id : number = 1;  
    public saldo : Saldo = new Saldo(100000,0,0);

    constructor(public nome: string = '', public email: string = '', public senha: string = ''){
        this.nome = nome;
        this.email = email;
        this.senha = senha;                
    }    

    public Create() : number {           
        useIndexedDB('cliente').getAll()
        .then(lista => {

            var _nextId = lista.reverse()[0].id + 1;
            this.id = parseInt(_nextId);   
                    
            useIndexedDB('cliente').add(this).then( o => {   
                  
                if(o > 0){
                    this.saldo.cliente_id = o;
                    this.saldo.Create();     
                    
                    PubSub.publish("update-msg", ['success','Cliente cadastrado com sucesso.',true]);
                    return o;
                }           
            }).catch(err => {
                PubSub.publish("update-msg", ['err','Houve algum problema ao cadastrar o cliente.',true]);          
                console.log(err);
            });
        })

       
        return 0;
    }  
  
     Logar() : Promise<Cliente>{       
        return useIndexedDB('cliente').getAll()
        .then((cli : Array<Cliente>) => {
            return cli.filter(o => o.email == this.email && o.senha == this.senha)[0];                                 
        })     
    }

}