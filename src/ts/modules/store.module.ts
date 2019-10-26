import { State } from "../interfaces";

export class Store {
       private static Instance:Store;
       private storageKey= 'todos';
       private store:State = {
           todos:[],
           cardIDToEdit:-1,
           editActive:false
       };
       private subscribers =[];
       private dispatchers= [];
       constructor(dispatcher){
        if(Store.Instance){
           return Store.Instance;
        }         
        if(typeof dispatcher === "function"){
            this.dispatchers.push(dispatcher);
            Store.Instance=this;
            this.Dispatch= this.Dispatch.bind(this);
            this.getItems();
          }
          else {
              return null;
            }             
       }
       private  getItems(){
       let cards = JSON.parse(localStorage.getItem(this.storageKey));
        if( cards &&cards.length>0){
          this.store.todos= cards;             
        }else{
            this.setItems();
        }

       }
       private  setItems(){
            localStorage.setItem(this.storageKey,JSON.stringify(this.store.todos));
       } 
       public RegisterDispatcher(dispatcher){
        if(typeof dispatcher === "function"){
                 this.dispatchers.push(dispatcher);
        }
       };

       public GetStore = () => {
           this.getItems(); 
           return Object.freeze({ ...this.store });
        };

       public Subscribe (fun) {
            if (typeof fun === 'function') {
                this.subscribers.push(fun);
                this.informSubs();
            }
        };
       public Dispatch(action) {
        console.log(this);
         if (typeof action === 'object') {
         let newStore = { ...this.store };
        
         console.log(newStore);
         this.dispatchers.forEach(dispatcher => {
             newStore=dispatcher(newStore,action);
          });             
        this.store = newStore;
        this.setItems();
         this.informSubs();
        }
        };   
       
        private informSubs(){
            this.subscribers.forEach(
                (call) => call(this.GetStore()));
        }
        
     }