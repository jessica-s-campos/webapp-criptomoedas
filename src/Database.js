
 export const DBConfig = {
    name: 'MyDB',
    version: 1,
    objectStoresMeta: [
      {
        store: 'movimentacao',
       
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [

              { name: 'data', keypath: 'data', options: { unique: false } },
              { name: 'operacao', keypath: 'operacao', options: { unique: false } },
              { name: 'criptomoeda1', keypath: 'criptomoeda1', options: { unique: false } },
              { name: 'criptomoeda2', keypath: 'criptomoeda2', options: { unique: false } },
              { name: 'valor', keypath: 'valor', options: { unique: false } },
              { name: 'quantidade', keypath: 'quantidade', options: { unique: false } },
              { name: 'cotacao', keypath: 'cotacao', options: { unique: false } },
              { name: 'cliente_id', keypath: 'cliente_id', options: { unique: false } },
            ]            
      },
      {
        store: 'cliente',
        
            storeConfig: { keyPath: 'id', autoIncrement: true, unique : true },
            storeSchema: [   
            
              { name: 'nome', keypath: 'nome', options: { unique: false } },
              { name: 'email', keypath: 'email', options: { unique: false } },
              { name: 'senha', keypath: 'senha', options: { unique: false } }            
            ]
      },
      {
        store: 'saldo',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
              { name: 'cliente_id', keypath: 'cliente_id', options: { unique: false } },
              { name: 'dinheiro', keypath: 'dinheiro', options: { unique: false } },
              { name: 'bitcoins', keypath: 'bitcoins', options: { unique: false } },            
              { name: 'britas', keypath: 'britas', options: { unique: false } }           
            ]
      }
      ,
      {
        store: 'cotacao',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
              { name: 'ultimacotacao', keypath: 'ultimacotacao', options: { unique: false } },
              { name: 'data', keypath: 'data', options: { unique: false } },
              { name: 'moeda', keypath: 'moeda', options: { unique: false } }     
            ]
      }
    ]
    
  };
