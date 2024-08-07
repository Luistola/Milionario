import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PousarComponent } from './pousar.component';

describe('PousarComponent', () => {
  let component: PousarComponent;
  let fixture: ComponentFixture<PousarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PousarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PousarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
