import { Card } from "../interfaces";
import { Status } from "../data"
export class CardsManager {
    static findByID(cards: Card[], id: number): Card {
        return cards.find(card => card.id === id);
    }
    static findByTitle(cards: Card[], titleToSearch: string) {
        if (titleToSearch.trim() !== "") {
            return cards.filter((card, index) => card.title.toLowerCase().includes(titleToSearch.toLowerCase()));
        } else {
            return cards;
        }
    }
    static getIndexByID(cards: Card[], id: number): number {
        return cards.findIndex(card => card.id === id);
    }
    static filterByPriority(cards: Card[], priority: string) {
        if (priority == 'all') {
            return cards;
        } else {
            return cards.filter((card, index) => Number(card.priority) === Number(priority));
        }
    }
    static filterByStatus(cards: Card[], status: string) {
        if (status === Status.All) {
            return cards;
        } else if (status === Status.Open) { 
            return cards.filter((card, index) => card.done === false);
        } else if (status === Status.Done) {
            return cards.filter((card, index) => card.done === true);
        }
    }
    static sortByStatus(cards: Card[]) {
        cards.sort(card => card.done ? 1 : -1);
    }
    static removeCard(cards: Card[], id: number) {
        let index = CardsManager.getIndexByID(cards, id);
        if (index !== -1) {
            cards.splice(index, 1);
        }
    }
    static searchWithExactTitle(cards: Card[], title:string):boolean{
        return cards.findIndex(card => card.title.toLowerCase().trim() === title.toLowerCase().trim())!== -1;
    }
}