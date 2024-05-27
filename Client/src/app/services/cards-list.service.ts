import { CardsList } from '../models/cards-list.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsListService {

  constructor() { }
  allLists!:CardsList[];
}
