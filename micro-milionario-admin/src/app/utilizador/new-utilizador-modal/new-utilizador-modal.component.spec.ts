import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUtilizadorModalComponent } from './new-utilizador-modal.component';

describe('NewUtilizadorModalComponent', () => {
  let component: NewUtilizadorModalComponent;
  let fixture: ComponentFixture<NewUtilizadorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUtilizadorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUtilizadorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
