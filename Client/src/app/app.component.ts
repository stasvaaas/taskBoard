import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardService } from './services/card.service';
import { Card } from './models/card.model';
import apiEndpoints from './constants/apiEndpoints';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateCardComponent } from './modal-create-card/modal-create-card.component';
import { CardsList } from './models/cards-list.model';
import { CardsListService } from './services/cards-list.service';
import { ModalUpdateCardComponent } from './modal-update-card/modal-update-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
formatDate(dateString: Date):string {

  const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  title = 'Client';
  modalOptions:NgbModalOptions = {
    size:'lg'
  }
  constructor(private httpClient:HttpClient, public cardService:CardService,public listService:CardsListService, private modalService: NgbModal )
  {
    
  }

  getNameById(id:string) {
    const item = this.listService.allLists.find(element => element.id === id);
    
    return item ? item.name : ''; // Return id if found, otherwise return an empty string
  }

  ngOnInit(): void {
    this.httpClient.get<Card[]>(apiEndpoints.GET_ALL_CARDS)
    .subscribe(response => {
      this.cardService.allCards = response;
      console.log(this.cardService.allCards);
    });
    this.httpClient.get<CardsList[]>(apiEndpoints.GET_ALL_LISTS)
      .subscribe(response =>{
        this.listService.allLists = response;
        console.log(this.listService.allLists);
      })
 

  };
  onClickBtnCreateCard(){
    this.modalService.open(ModalCreateCardComponent, this.modalOptions);
  };

  onClickBtnUpdateCard(card: Card)
  {
    const modalRef = this.modalService.open(ModalUpdateCardComponent, this.modalOptions);
    modalRef.componentInstance.cardToUpdate = card;
  }
}
   
    
    