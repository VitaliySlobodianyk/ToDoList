import { Store } from './store.module';
import { Priority } from '../data';
import { CardsManager } from '../managers/cards.manager';
import { userActions } from '../actions';

export class ToDos {
    private searchField = <HTMLInputElement>document.getElementById('titleSearch');
    private statusSearch = <HTMLSelectElement>document.getElementById('statusSearch');
    private prioritySearch = <HTMLSelectElement>document.getElementById('prioritySearch');

    private container = document.querySelector('.todos');
    private store: Store;
    constructor(store: Store) {
        this.store = store;
        this.store.Subscribe(this.renderCards.bind(this));
        this.searchField.addEventListener('input', this.renderCards.bind(this));
        this.statusSearch.addEventListener('change', this.renderCards.bind(this));
        this.prioritySearch.addEventListener('change', this.renderCards.bind(this));
    }

    private renderCards() {
        const state: any = this.store.GetStore();
        let filtered = CardsManager.findByTitle(state.todos, this.searchField.value);
        filtered = CardsManager.filterByStatus(
            filtered,
            this.statusSearch.options[this.statusSearch.selectedIndex].value,
        );
        filtered = CardsManager.filterByPriority(
            filtered,
            this.prioritySearch.options[this.prioritySearch.selectedIndex].value,
        );
        CardsManager.sortByStatus(filtered);
        this.container.innerHTML = '';

        if (filtered.length > 0) {
            filtered.forEach(element => {
                let div = document.createElement('div');
                div.classList.add('card');
                div.id = element.id.toString();
                let priorityText;
                console.log(typeof element.priority);
                        
                switch(Number(element.priority)){ 
                    case 0:{
                        priorityText="text-primary";
                    }break;
                    case 1:{
                        priorityText="text-success";
                    }break;
                    case 2:{
                        priorityText="text-danger";
                    }break;
                    default:{
                        priorityText="text-secondary";
                    }
                } 
                console.log(priorityText);
                if (!element.done) {
                    div.innerHTML = `
            <h2 class="title card-title">${element.title} </h2>
            <p class="description card-body">${element.description}</p>
           
            <div class="line--bottom">
                 <div class ="priority card-subtitle ${priorityText}">${Priority.GetName(element.priority)}</div>                                
                 <div class="dropdown actions">
                    <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     Options
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                    <button class=" functions__done dropdown-item">Done</button>
                    <button class=" functions__edit dropdown-item">Edit</button>
                    <div class="dropdown-divider"></div>
                    <button class=" functions__delete dropdown-item text-danger">Delete</button>
                    </div>
                 </div>                                      
            </div>`;
                    div.querySelector('.functions__done').addEventListener('click', () => {
                        this.done(element.id);
                    });
                } else {
                    div.classList.add('done');
                    div.innerHTML =  `<h2 class="title card-title">${element.title} </h2>
                    <p class="description card-body">${element.description}</p>
                   
                    <div class="line--bottom">
                         <div class ="priority card-subtitle ${priorityText}">${Priority.GetName(element.priority)}</div>                                
                         <div class="dropdown actions">
                            <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                             Options
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                            <button class=" functions__done dropdown-item">UnDone</button>
                            <button class=" functions__edit dropdown-item">Edit</button>
                            <div class="dropdown-divider"></div>
                            <button class=" functions__delete dropdown-item text-danger">Delete</button>
                            </div>
                         </div>                                      
                    </div>`;
                    div.querySelector('.functions__done').addEventListener('click', () => {
                        this.unDone(element.id);
                    });
                }
                div.querySelector('.functions__delete').addEventListener('click', () => {
                    this.delete(element.id);
                });
                div.querySelector('.functions__edit').addEventListener('click', () => {
                    this.edit(element.id);
                });
                this.container.appendChild(div);
            });
        } else {
            this.container.innerHTML = `<h1>No ToDOs!</h1>`;
        }
    }

    private delete(id: number) {
        this.store.Dispatch(userActions.rEMOVE_CARD(id));
    }
    private edit(id: number) {
        this.store.Dispatch(userActions.edit_Card(id));
    }
    private done(id: number) {
        this.store.Dispatch(userActions.set_Done(id));
    }
    private unDone(id: number) {
        this.store.Dispatch(userActions.set_Undone(id));
    }
}
