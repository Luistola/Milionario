import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntiresModalComponent } from './add-entires-modal.component';

describe('AddEntiresModalComponent', () => {
  let component: AddEntiresModalComponent;
  let fixture: ComponentFixture<AddEntiresModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntiresModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntiresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
