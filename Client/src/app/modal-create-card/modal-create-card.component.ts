import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import apiEndpoints from '../constants/apiEndpoints';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService } from '../services/card.service';
import { CardDTO } from '../models/cardDTO.model';
import HTTP_OPTIONS from '../constants/HttpOptions';
import { Card } from '../models/card.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CardsListService } from '../services/cards-list.service';




@Component({
  selector: 'app-modal-create-card',
  imports:[ReactiveFormsModule],
  standalone:true,
  templateUrl: './modal-create-card.component.html',
  styleUrls: ['./modal-create-card.component.css']
})
export class ModalCreateCardComponent {
  form!: FormGroup;
  createSuccessful: boolean = false;
  createFailed: boolean = false;
  lists!: string[];
  dueDate!: Date;
  selectedOption: string = ''; 

  constructor(public formBuilder: FormBuilder, private httpClient: HttpClient, public activeModal: NgbActiveModal, private cardService: CardService, private  listService:CardsListService) {
    this.lists=[];
    this.listService.allLists.forEach(x=>this.lists.push(x.name));
    this.form = this.formBuilder.group({
      name: ['Example Card Title',Validators.required],
      description: ['Example Card description',Validators.required],
      priority:['Priority',Validators.required]
    });
    
  }
  
  
  getIdByName(name:string) {
    const item = this.listService.allLists.find(element => element.name === name);
    
    return item ? item.id : ''; // Return id if found, otherwise return an empty string
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

  submitForm() {
    var cardToCreate = {} as CardDTO;
    cardToCreate.name = this.form.get('name')!.value;
    cardToCreate.description = this.form.get('description')!.value;
    cardToCreate.dueDate = new Date(this.dueDate) as Date;

    cardToCreate.priority = this.form.get('priority')!.value;

    cardToCreate.listId=this.selectedOption;
    console.log(cardToCreate);
    
    this.httpClient
      .post(apiEndpoints.CREATE_CARD, cardToCreate, HTTP_OPTIONS)
      .subscribe({
        next: (createdCardFromServer) => {
          this.createSuccessful = true;

          this.cardService.allCards.push(createdCardFromServer as Card);

          console.log('Successfully created a card! Response from server:');
          console.log(createdCardFromServer);
        },
        error: (error: HttpErrorResponse) => {
          this.createFailed = true;
          console.log(`Failed to create card! Response from server: "HTTP statuscode: ${error.status}: ${error.error}"`);
        },
      });
  }

}
