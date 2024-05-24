import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VencedorParticipanteComponent } from './vencedor-participante.component';

describe('VencedorParticipanteComponent', () => {
  let component: VencedorParticipanteComponent;
  let fixture: ComponentFixture<VencedorParticipanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VencedorParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VencedorParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
