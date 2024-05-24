import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConcursoModalComponent } from './new-concurso-modal.component';

describe('NewConcursoModalComponent', () => {
  let component: NewConcursoModalComponent;
  let fixture: ComponentFixture<NewConcursoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConcursoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConcursoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
