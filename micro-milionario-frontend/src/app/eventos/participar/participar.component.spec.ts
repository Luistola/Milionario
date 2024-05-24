import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticiparComponent } from './participar.component';

describe('ParticiparComponent', () => {
  let component: ParticiparComponent;
  let fixture: ComponentFixture<ParticiparComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticiparComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticiparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
