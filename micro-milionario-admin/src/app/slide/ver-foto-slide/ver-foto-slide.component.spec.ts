import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFotoSlideComponent } from './ver-foto-slide.component';

describe('VerFotoSlideComponent', () => {
  let component: VerFotoSlideComponent;
  let fixture: ComponentFixture<VerFotoSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFotoSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFotoSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
