export  class DateHelper{
    static  toDateCotacao(data: Date) : string {
        return  data.getMonth() + "-" + data.getDate() + "-" + data.getFullYear();
    }
}