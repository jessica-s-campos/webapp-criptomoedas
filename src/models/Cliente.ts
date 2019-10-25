import { Carteira } from "./Carteira";

export class Cliente{
        

    private carteira : Carteira;

    constructor(private id: number, public nome: string){
        this.carteira = new Carteira();
    }


    public getDinheiro(): number{
        return this.carteira.getDinheiro();
    }
    
}