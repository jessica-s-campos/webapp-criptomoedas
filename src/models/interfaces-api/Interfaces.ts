export interface ICotacaoBrita extends ICotacao {
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: string;
}

export interface ICotacaoBitcoin extends ICotacao {
    high:string;
    low: string;
    vol: string;
    last:string;
    buy: string;
    sell:string;
    date:number; 
}

export interface ICotacao{

}
