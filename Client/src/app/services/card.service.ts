import {Card} from '../models/card.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }
  allCards!:Card[];
}
