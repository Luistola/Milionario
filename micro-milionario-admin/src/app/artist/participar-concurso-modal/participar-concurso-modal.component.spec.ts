import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticiparConcursoModalComponent } from './participar-concurso-modal.component';

describe('ParticiparConcursoModalComponent', () => {
  let component: ParticiparConcursoModalComponent;
  let fixture: ComponentFixture<ParticiparConcursoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticiparConcursoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticiparConcursoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
