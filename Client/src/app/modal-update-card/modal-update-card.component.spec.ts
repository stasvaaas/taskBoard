import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateCardComponent } from './modal-update-card.component';

describe('ModalUpdateCardComponent', () => {
  let component: ModalUpdateCardComponent;
  let fixture: ComponentFixture<ModalUpdateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
