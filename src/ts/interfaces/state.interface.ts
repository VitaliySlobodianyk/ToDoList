import {Card} from "./card.interface";
export interface State{
    todos : Card[];
    cardIDToEdit:number;
    editActive: boolean;  
}
