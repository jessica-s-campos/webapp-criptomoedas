export  class DateHelper{
    static  toDateCotacaoBrita(data: Date) : string {        
        if(this.EhDiaUtil(data)){
            console.log('é dia ultil')
            return  (data.getMonth()+1) + "-" + data.getDate() + "-" + data.getFullYear();
        } else{
            console.log('NÃO é dia ultil')
            data = this.DiaUtilAnterior(data);
            console.log('ultimo dia útil:', data)
            return  (data.getMonth()+1) + "-" + data.getDate() + "-" + data.getFullYear();
        }
    }
    static  toDateCotacaoBitcoin(data: Date) : string {
        return  data.getFullYear() + "/" + (data.getMonth()+1) + "/" + data.getDate();
    }

    static EhDiaUtil(data : Date){
        return data.getDay() !== 0 || data.getDay() !== 6;
    }

    static DiaUtilAnterior(data : Date) : Date {
        var _data = data;
        
        if(data.getDay() == 0)// domingo -2 dias
            _data = new Date(data.getFullYear(), data.getMonth(), data.getDate() - 2);       
        else if(data.getDay() == 1)//segunda -3 dias
            _data = new Date(data.getFullYear(), data.getMonth(), data.getDate() - 3);
        else//sábado e demais dias -1 dia
            _data = new Date(data.getFullYear(), data.getMonth(), data.getDate() - 1);

        return _data;
    }
}