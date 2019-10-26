import {Store} from "./store.module";
import {State} from "../interfaces";
import  {userActions}  from "../actions";
 
export class Edit {
    
  
    private createButton= document.getElementById('createBut');
    private store:Store;
    
    constructor(store:Store) {
        this.store=store;
        
        this.createButton.addEventListener('click', this.click.bind(this));           
    }
  
  
   private click(){
        this.store.Dispatch(userActions.aDD_CARD());
    }

}