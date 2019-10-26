import {Actions} from "./action.enum"
export const userActions = {
    aDD_CARD() {
        return {
            type: Actions.addCard, 
            value: "add"
        };
    },
    rEMOVE_CARD(itemId) {
        return {
            type: Actions.removeCard,
            value: itemId
        };
    },
    sEARCH_CARDS(searchObj) {
        return {
            type: Actions.searchItems,
            value: searchObj
        };
    },
    hide_EDIT() {
        return {
            type: Actions.hideEdit,
            value: "edit"
        };
    },
    save_Card(id){
        return{
            type: Actions.saveCard,
            value: id
        };
    },
    edit_Card(id){
        return{
            type: Actions.editCard,
            value: id
        };
    },
    set_Done(id){
        return{
            type: Actions.markDone,
            value: id
        };
    },
    set_Undone(id){
        return{
            type: Actions.markUnDone,
            value: id
        };
    }
    
};