export class IDManager{
    private static currentId = -1;
    private static autoincrement(){
        IDManager.currentId++;
    }
    private static setId(){
       this.autoincrement();
        localStorage.setItem('id',String(this.currentId));
    }
    private static readId(){
        let id =localStorage.getItem('id');
        if(!id){
            localStorage.setItem('id',String(-1));
        }
          
        this.currentId= Number(localStorage.getItem('id'));
    }
    public static getId(){
        this.readId();
        this.setId();
        return   IDManager.currentId ;
    }
}