
const version = 1;
const dbName = 'MyDB';

export  var Connection : IDBDatabase;

export class ConnectionFactory {

    public openRequest : IDBOpenDBRequest;

    constructor() {
        this.openRequest = window.indexedDB.open(dbName,version);
        
        this.openRequest.onsuccess = e => {
            //conexao obtida com sucesso    
            Connection = this.openRequest.result;
        }
    
        this.openRequest.onupgradeneeded = e => {
            //cria ou altera um banco já existente

            var objectStore = Connection.createObjectStore("movimentacao", {  keyPath: 'id', autoIncrement: true });           
                objectStore.createIndex('data', 'data', { unique: false } );
                objectStore.createIndex('operacao', 'operacao', { unique: false } );
                objectStore.createIndex('criptomoeda1', 'criptomoeda1', { unique: false } );
                objectStore.createIndex('criptomoeda2', 'criptomoeda2', { unique: false } );
                objectStore.createIndex('valor', 'valor', { unique: false } );
                objectStore.createIndex('quantidade', 'quantidade', { unique: false } );
                objectStore.createIndex('cotacao', 'cotacao', { unique: false } );
                objectStore.createIndex('cliente_id', 'cliente_id', { unique: false } );
            
            objectStore = Connection.createObjectStore("cliente", {  keyPath: 'id', autoIncrement: true });                       
                objectStore.createIndex('nome', 'nome', { unique: false } );
                objectStore.createIndex('email', 'email', { unique: false } );
                objectStore.createIndex('senha', 'senha', { unique: false } );    
        
            objectStore = Connection.createObjectStore("saldo", {  keyPath: 'id', autoIncrement: true });                       
                objectStore.createIndex('cliente_id', 'cliente_id', { unique: false } );
                objectStore.createIndex('dinheiro', 'dinheiro', { unique: false } );
                objectStore.createIndex('bitcoins', 'bitcoins', { unique: false } );            
                objectStore.createIndex('britas', 'britas', { unique: false } );   

        }

        this.openRequest.onerror= e => {
            Connection = this.openRequest.result;
        }

    }

    static getConnection() : IDBDatabase{
        return Connection;
    }

    static openTransaction(store : string, modo : Modo) : IDBObjectStore {
        return Connection.transaction(store, modo).objectStore(store);
    }

}

export enum Modo{
    readwrite = "readwrite",
    readonly = "readonly",
    versionchange = "versionchange"
}

  
    
