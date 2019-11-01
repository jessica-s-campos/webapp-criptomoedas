export  class DateHelper{
    static  toDateCotacaoBrita(data: Date) : string {
        return  (data.getMonth()+1) + "-" + data.getDate() + "-" + data.getFullYear();
    }
    static  toDateCotacaoBitcoin(data: Date) : string {
        return  data.getFullYear() + "/" + (data.getMonth()+1) + "/" + data.getDate();
    }
}