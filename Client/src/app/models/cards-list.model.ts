import { Card } from "./card.model";

export interface CardsList {
    id:string;
    name:string;
    cards: Card[];
}
