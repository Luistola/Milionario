import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFotoComponent } from './ver-foto.component';

describe('VerFotoComponent', () => {
  let component: VerFotoComponent;
  let fixture: ComponentFixture<VerFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
