import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      //not sure about the code from here
      declarations:[CardService],
      imports:[ReactiveFormsModule],
    })
    .compileComponents();
    //till here
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
