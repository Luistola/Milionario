import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VencedoresComponent } from './vencedores.component';

describe('VencedoresComponent', () => {
  let component: VencedoresComponent;
  let fixture: ComponentFixture<VencedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VencedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VencedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
