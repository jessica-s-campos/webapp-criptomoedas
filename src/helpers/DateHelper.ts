export  class DateHelper{
    static  toDateCotacaoBrita(data: Date) : string {
        return  data.getMonth() + "-" + data.getDate() + "-" + data.getFullYear();
    }
    static  toDateCotacaoBitcoin(data: Date) : string {
        return  data.getFullYear() + "/" + data.getMonth() + "/" + data.getDate();
    }
}