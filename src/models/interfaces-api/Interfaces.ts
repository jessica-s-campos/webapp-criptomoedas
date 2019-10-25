export interface ICotacaoBrita extends ICotacao {
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: string;
}

export interface ICotacaoBitcoin extends ICotacao {
    date: string,
    opening: number,
    closing: number,
    lowest: number,
    highest: number,
    volume: number,
    quantity: number,
    amount: number,
    avg_price: number    
}

export interface ICotacao{

}
