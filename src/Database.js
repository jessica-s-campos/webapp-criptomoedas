

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
            ]
      }
    ]
  };
