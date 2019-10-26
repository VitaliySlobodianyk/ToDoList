import { Store } from "./store.module";
import { Priority } from "../data";
import { CardsManager } from "../managers/cards.manager";
import { userActions } from "../actions";


export class ToDos {
    private searchField = <HTMLInputElement>document.getElementById('titleSearch');
    private statusSearch = <HTMLSelectElement>document.getElementById('statusSearch');
    private prioritySearch = <HTMLSelectElement>document.getElementById('prioritySearch');

    private container = document.querySelector(".todos");
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
        filtered = CardsManager.filterByStatus(filtered, this.statusSearch.options[this.statusSearch.selectedIndex].value);
        filtered = CardsManager.filterByPriority(filtered, this.prioritySearch.options[this.prioritySearch.selectedIndex].value);
       CardsManager.sortByStatus(filtered);
        this.container.innerHTML = "";

        if (filtered.length > 0) {
            filtered.forEach(element => {
                let div = document.createElement('div');
                div.classList.add("card");
                div.id = element.id.toString();
                if (!element.done) {
                    div.innerHTML = `
            <h2 class="title">${element.title} </h2>
            <p class="description">${element.description}</p>
           
            <div class="line--bottom">
            <div class ="priority">${Priority.GetName(element.priority)}</div>
            <div class="actions">
                <div class="button">
                    ...
                </div>
                <div class="functions">
                    <button class="function functions__done">Done</button>
                     <button class="function functions__edit">Edit</button>
                     <button class="function functions__delete">Delete</button>
                </div>
            </div>
            </div>
            </select>`;
        div.querySelector('.functions__done').addEventListener('click', () => {
                this.done(element.id);
            });
        } else {
                    div.classList.add('done');
                    div.innerHTML =
                        `<h2 class="title">${element.title} </h2>
            <p class="description">${element.description}</p>
           
            <div class="line--bottom">
            <div class ="priority">${Priority.GetName(element.priority)}</div>
            <div class="actions">
                <div class="button">
                    ...
                </div>
                <div class="functions">
                    <button class="function functions__done">UnDone</button>
                     <button class="function functions__edit" disabled>Edit</button>
                     <button class="function functions__delete">Delete</button>
                </div>
            </div>
            </div>
            </select>`;
            div.querySelector('.functions__done').addEventListener('click', () => {
                this.unDone(element.id);
            });
                }

                div.querySelector('.functions__delete').addEventListener('click', () => {
                    this.delete(element.id);
                })
                div.querySelector('.functions__edit').addEventListener('click', () => {
                    this.edit(element.id);
                })
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
    private done(id:number) {
        this.store.Dispatch(userActions.set_Done(id));
    }
    private unDone(id:number) {
        this.store.Dispatch(userActions.set_Undone(id));
    }

}