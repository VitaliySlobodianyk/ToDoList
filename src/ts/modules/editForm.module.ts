import { Store } from "./store.module";
import { userActions } from "../actions";
import { CardsManager } from "../managers/cards.manager";

export class Form {

    private modalWindow = document.getElementById('modal');

    private modeHeader = document.getElementById("modal-title");
    private title = <HTMLInputElement>document.getElementById('edit__title');
    private description = <HTMLInputElement>document.getElementById('edit__description');
    private priority = <HTMLSelectElement>document.getElementById('edit__priority');

    private cancelButton = document.getElementById('edit__cancel');
    private closeButton = document.getElementById('modal-close');
    private saveButton = document.getElementById('edit__save');
    private store: Store;

    constructor(store: Store) {
        this.store = store;

        this.cancelButton.addEventListener('click', this.cancel.bind(this));
        this.saveButton.addEventListener('click', this.save.bind(this));
        this.closeButton.addEventListener('click', this.cancel.bind(this));
        store.Subscribe(this.show.bind(this));
    }
    public show() {
        let data: any = this.store.GetStore();
        if (data.editActive) {
            this.modalWindow.style.display = 'block';
            if (data.cardIDToEdit != -1) {
                this.modeHeader.textContent = "Edit Card";
                let card = CardsManager.findByID(data.todos, data.cardIDToEdit);
                this.title.value = card.title;
                console.log(card.priority);
                this.priority.selectedIndex = card.priority;
                this.description.value = card.description;
            } else {
                this.modeHeader.textContent = "Create Card";
            }
        } else {
            this.modalWindow.style.display = 'none';
        }
    };

    private clearFields() {
        this.title.value = "";
        this.description.value = "";
        this.priority.selectedIndex = 1;
    }

    private cancel() {
        this.store.Dispatch(userActions.hide_EDIT());
        this.clearFields();
    }
    private save() {
        let data = this.store.GetStore();
        if (data.cardIDToEdit === -1) {
            if (!CardsManager.searchWithExactTitle(this.store.GetStore().todos, this.title.value)) {
                this.saver();
                this.clearFields();
            }
            else {
                this.exists();
                setTimeout(() => {
                    this.mode(data);
                }, 3000)
            }
        } else {
            this.saver();
            this.clearFields();
        }



    }
    private saver() {
        this.store.Dispatch(userActions.save_Card({
            title: this.title.value,
            description: this.description.value,
            priority: this.priority.options[this.priority.selectedIndex].value
        }));
    }
    private exists() {
        this.modeHeader.textContent = "Card with  such title  already exists!";
        this.modeHeader.classList.add('text-danger');
    }
    private mode(data) {
        if (data.cardIDToEdit !== -1) {
            this.modeHeader.textContent = "Edit Card";
        } else {
            this.modeHeader.textContent = "Create Card";
        }
        this.modeHeader.classList.remove('text-danger');
    }
}