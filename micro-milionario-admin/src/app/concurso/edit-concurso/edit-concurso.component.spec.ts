import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConcursoComponent } from './edit-concurso.component';

describe('EditConcursoComponent', () => {
  let component: EditConcursoComponent;
  let fixture: ComponentFixture<EditConcursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConcursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
