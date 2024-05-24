import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecargaModalComponent } from './new-recarga-modal.component';

describe('NewRecargaModalComponent', () => {
  let component: NewRecargaModalComponent;
  let fixture: ComponentFixture<NewRecargaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRecargaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecargaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
