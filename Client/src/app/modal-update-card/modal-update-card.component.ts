import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import apiEndpoints from '../constants/apiEndpoints';
import HTTP_OPTIONS from '../constants/HttpOptions';
import { CardDTO } from '../models/cardDTO.model';
import { CardService } from '../services/card.service';
import { CardsListService } from '../services/cards-list.service';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-modal-update-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-update-card.component.html',
  styleUrl: './modal-update-card.component.css'
})
export class ModalUpdateCardComponent implements OnInit {
  form!: FormGroup;
  cardToUpdate!: Card;

  updateSuccessful: boolean = false;
  updateFailed: boolean = false;

  dueDate!: Date;
  selectedOption: string = '';
  lists!: string[];
  constructor(public fb: FormBuilder, private httpClient:HttpClient, public activeModal: NgbActiveModal, private cardService: CardService, private  listService:CardsListService)
  {
    this.lists=[];
    this.listService.allLists.forEach(x=>this.lists.push(x.name));

  }

  getIdByName(name:string) {
    const item = this.listService.allLists.find(element => element.name === name);
    
    return item ? item.id : ''; // Return id if found, otherwise return an empty string
  }

  getNameById(id:string) {
    const item = this.listService.allLists.find(element => element.id === id);
    
    return item ? item.name : ''; // Return name if found, otherwise return an empty string
  }

  onSelectListNameChange(event: Event) {
    const selectedName = (event.target as HTMLSelectElement).value;
    this.selectedOption = this.getIdByName(selectedName);
    this.form.get('listName')?.setValue(this.selectedOption);
    
    console.log(this.selectedOption);
  }

  onSelectDueDateChange(event: Event)
  {
    const date = (event.target as HTMLInputElement).value;
    this.dueDate = new Date(date);
    this.form.get('dueDate')?.setValue(this.dueDate);
    console.log(this.dueDate);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id:[this.cardToUpdate.id],
      name:[this.cardToUpdate.name],
      description:[this.cardToUpdate.description],
      dueDate:[this.cardToUpdate.dueDate],
      listId:[this.cardToUpdate.listId],
      priority:[this.cardToUpdate.priority]
    });
    this.form.controls['id'].disable();
    console.log(this.cardToUpdate.id);
  }

  submitForm()
  {
    var cardToUpdateDto = {} as CardDTO;
    
    cardToUpdateDto.name = this.form.get('name')!.value;
    cardToUpdateDto.description = this.form.get('description')!.value;
    cardToUpdateDto.listId = this.form.get('listId')!.value;
    cardToUpdateDto.dueDate = new Date(this.dueDate) as Date;
    cardToUpdateDto.priority = this.form.get('priority')!.value;

    this.httpClient
    .put(`${apiEndpoints.UPDATE_CARD}/${this.cardToUpdate.id}`, cardToUpdateDto, HTTP_OPTIONS)
    .subscribe({
      next: (response) =>{
        this.updateSuccessful = true;
        let updatedCardFromServer: Card = response as Card;
        let updatedCardIndex = this.cardService.allCards.findIndex((card => card.id == updatedCardFromServer.id));
        this.cardService.allCards[updatedCardIndex].name = updatedCardFromServer.name;
        this.cardService.allCards[updatedCardIndex].description = updatedCardFromServer.description;
        this.cardService.allCards[updatedCardIndex].listId = updatedCardFromServer.listId;
        this.cardService.allCards[updatedCardIndex].dueDate = updatedCardFromServer.dueDate;
        this.cardService.allCards[updatedCardIndex].priority = updatedCardFromServer.priority;
      
      },
      error: (error: HttpErrorResponse) => {
        this.updateFailed = true;
        console.log(`Failed to update the post! Response from server: "HTTP statuscode: ${error.status}: ${error.error}"`);
      },
    })
  }
}
