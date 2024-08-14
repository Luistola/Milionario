import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoModalComponent } from './voto-modal.component';

describe('VotoModalComponent', () => {
  let component: VotoModalComponent;
  let fixture: ComponentFixture<VotoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
