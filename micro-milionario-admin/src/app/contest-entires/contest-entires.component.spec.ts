import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestEntiresComponent } from './contest-entires.component';

describe('ContestEntiresComponent', () => {
  let component: ContestEntiresComponent;
  let fixture: ComponentFixture<ContestEntiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestEntiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestEntiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
