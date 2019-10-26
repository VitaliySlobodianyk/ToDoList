import { Actions } from "../actions/action.enum";
import { IDManager } from "../managers";
import { CardsManager } from "../managers/cards.manager";
export const mainReducer = (currentState, action) => {
    let nextState = { ...currentState };
    console.log(nextState);
    switch (action.type) {
        case Actions.addCard:
            {
                nextState.cardIDToEdit = -1;
                nextState.editActive = true;
            }
            break;
        case Actions.hideEdit: {
            nextState.cardIDToEdit = -1;
            nextState.editActive = false;
        } break;
        case Actions.saveCard: {
            if (nextState.cardIDToEdit != -1) {
                const index = CardsManager.getIndexByID(nextState.todos, nextState.cardIDToEdit);
                nextState.todos[index].title = action.value.title;
                nextState.todos[index].description = action.value.description;
                nextState.todos[index].priority = action.value.priority;
            } else {
                nextState.todos.push({
                    id: IDManager.getId(),
                    title: action.value.title,
                    description: action.value.description,
                    priority: action.value.priority,
                    done: false
                });
            }
            nextState.editActive = false;
            nextState.cardIDToEdit = -1;
        } break;
        case Actions.removeCard:
            {
                CardsManager.removeCard(nextState.todos, action.value);
            }
            break;
        case Actions.editCard:
            {
                nextState.cardIDToEdit = action.value;
                nextState.editActive = true;
            }
            break;
        case Actions.markDone:
            {
                let index = CardsManager.getIndexByID(nextState.todos, action.value);
                nextState.todos[index].done = true;
            }
            break;
        case Actions.markUnDone:
            {
                let index = CardsManager.getIndexByID(nextState.todos, action.value);
                nextState.todos[index].done = false;
            }
            break;


        default:
            return currentState;
    }
    return nextState;
};
